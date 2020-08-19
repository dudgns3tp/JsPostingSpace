const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const {KAKAO_ID} = require('../config/kakao.json');

const User = require('../models/user');

module.exports = () =>{
    passport.use(new KakaoStrategy({
        clientID:KAKAO_ID,
        callbackURL: '/auth/kakao/callback' ,
    }, async (accessToken, refreshToken, profile, done) =>{
        console.log('kakao profile: ',profile);
        try{
            const exUser = await User.findOne({
                where: {snsId: profile.id, provider: 'kakao' },
            });
            console.log('token :', accessToken);
            if(exUser){
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account.email,
                    name: profile.displayName,
                    snsId: profile.id,
                    provider: profile.provider,
                });
                done(null, newUser);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
};
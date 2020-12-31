const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = () => {
  passport.use(new kakaoStrategy({
    clientID: 'a6f3dc92726b458cf6d703046e6cf517',
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(`accessToken ${accessToken}`);
    console.log(`refreshToken ${refreshToken}`);
    try {
      const isUser = await User.findOne({
        where: {snsId: profile.id, provider: 'kakao' },
      });
      if(isUser) {
        done(null, isUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account.email,
          userName: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (err) {
      console.log(err);
      done(err);
    }
  }));
}
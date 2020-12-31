const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      console.log(email)
      const isUser = await User.findOne({ where: { email }});
      if(isUser) {
        const hashedPassword = crypto.pbkdf2Sync(password, isUser.salt, 10000, 64, 'sha512').toString('base64');
        if(hashedPassword == isUser.password) {
          console.log('성공');
          done(null, isUser);
        } else {
          console.log('비밀번호가 일치하지 않습니다.');
          done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
        }
      } else {
        console.log('존재하지 않는 회원');
        done(null, false, {message: '존재하지 않는 회원'});
      }
    } catch (err) {
      console.log(err);
      done(err);
    }
  }))
}
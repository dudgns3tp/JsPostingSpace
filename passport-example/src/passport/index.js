const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User }  = require('../models');

module.exports = () => {
  /**
   * 로그인시에만 실행.
   * => req.session 객체에 어떤 데이터를 저장할지 정하는 메서드. (user.id)
   */
  passport.serializeUser((user, done) => {
    console.log('serial')
    done(null, user.id);
  });

  /**
   * 매 요청시 실행
   * passport.session 미들웨어가 이 메서드를 호출
   * serializeUser 의 done의 두 번째 인수로 넣었던 데이터가 deserializeUser의 매개변수가 됨
   * => session에서 저장한 아이디를 사용자 정보 객체를 불러오는것
   */
  passport.deserializeUser((id, done) => {
    console.log('deserial')
    User.findOne({ where : { id }})
    .then(user => done(null, user)) // 두번째 인수 user는 즉 req.user에 저장
    .catch(err => done(err));
  });

  local();
  kakao();
}
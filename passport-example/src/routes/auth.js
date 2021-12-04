const express = require('express');
const passport = require('passport')
const router = express.Router();
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const userService = require('../service/index');

router.post('/signup', isNotLoggedIn, async (req, res) => {
  const { email, password, userName } = req.body; 
  if(!email || !password || !userName) {
    console.log('필요한 값이 없습니다!');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  try{
    const alreadyEmail = await userService.emailCheck(email);
    if(alreadyEmail){
      console.log('이미 존재하는 이메일 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
    }
    const user = await userService.signup(email, password, userName);
   
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
      email: user.email,
      password: user.password,
      userName: user.userName,
    }));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
  }
});


router.post('/signin', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if(authError) {
      res.status(500).send(util.fail(500, info.message));
    }

    if(!user) {
      res.status(400).send(util.fail(400, info.message));
    }

    return req.logIn(user, (loginError) => {
      if(loginError) {
        console.log(loginError);
        res.status(400).send(util.fail(400, info.message));
      }
      return res.status(200).send(util.success(200,'로그인 성공', user));
    })
  })(req, res, next);
})

router.get('/logout', isLoggedIn, (req, res) => {
  req.logIn();
  req.session.destroy();
  res.status(200).send(util.success(200, '로그아웃 성공'));
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  session: false
}), (req, res) => {
  console.log(req.session);
  res.status(200).send(util.success(200,"카카오 성공", req.user));
})

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'userName'],
    });
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_READ_ALL_SUCCESS, users));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const user = await User.findOne({
      where: {
        id: id,
      },
    })

    if (!user) {
      console.log('존재하지 않는 아이디 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));    
  }
});

module.exports = router;

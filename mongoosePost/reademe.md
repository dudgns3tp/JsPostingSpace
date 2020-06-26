
# 최영훈

<img style="border: 1px solid black !important; border-radius:20px;" src="https://avatars1.githubusercontent.com/u/40652160?s=460&u=9cd767fc9ae0adc0948fec0fb7c4fe126a64ffae&v=4" width="200px" />


## TMI ZONE
- 1995 서울 출생(3월 27일)     !(•̀ᴗ•́)و ̑̑
- 2007 동탄에 터를 잡고 생활 중
- 2014 인천대학교 컴퓨터 공학부 입학
- 2018 육군 운전병 만기 전역
- 2019 인천대학교 컴퓨터 공학부 35대 학생회장
- 2020 IT 창업동아리 SOPT 25기수료, 26기 서버파트 활동 중

**TMI WARNING!**

- 주방 알바 경험이 많아서 요리를 좋아함. 특히 야매요리 도전하는거 좋아해서 이상한데 맛있을 확률 72%
- ISFJ (용감한 수호자) 어머님의 마음으로 멘탈케어 해드려요 😊
- 운전도 잘함(안전운전, 방어운전 고수) 심지어 카트도 잘함
- 더 궁금하다면..? Pick me pick me <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3031d022-393c-488a-bf94-2506007776d4%2FLogo2.png?table=block&id=39591ca3-2f0c-48fb-82ea-aaa27be973d4&width=250&cache=v2" width="20px" /> me!


## 최영훈이 플레이스픽 에게 원하는 것 
- 실제 서비스 운영 경험
- 커뮤니케이션 능력 향상
- 폭풍 성장
- 귀여운 피기들... 🐷

## 최영훈이 플레이스픽을 위해 할 수 있는 것

- 실제 서비스 운영을 위한 개발
- notion 또는 github를 이용한 지속적인 커뮤니케이션
- 폭풍 성장
- 귀여워지기 🐷



# Dev

## 플레이스픽 서버 아키텍처


![플레이스픽 아키텍처](https://github.com/dudgns3tp/JsPostingSpace/blob/master/mongoosePost/public/images/arhite.png?raw=true)

플레이스픽의 데모 아키텍처입니다. 앱잼 기간 도중 다양한 변수가 작용하고 기획이 변경될 수 있는 부분을 고려하여 최종적인 아키텍처가 아닙니다! 얼마든지 변경 가능하고 파트원들과 논의해 보겠습니다! (특히 데이터베이스..!)

## 플레이스픽 서버파트 커뮤니케이션

notion? github? 최종적인 결정은 플레이스픽 팀원들과 논의하겠습니다.

### github Milestones 칸반보드 예시
![마일스톤](https://github.com/dudgns3tp/JsPostingSpace/blob/master/mongoosePost/public/images/mileston.png?raw=true)

스프린트에 따른 마일스톤

![스프린트예시](https://github.com/dudgns3tp/JsPostingSpace/blob/master/mongoosePost/public/images/splint1.png?raw=true)

 스프린트 이슈 티켓 예시

![클로즈](https://github.com/dudgns3tp/JsPostingSpace/blob/master/mongoosePost/public/images/close.png?raw=true)

완성된 기능은 close

### DB 모델링 예시

기능 명세서와 플레이스픽 핵심 화면을 참고하여 작성하였습니다. 개발에 앞서 가장 중요한 단계이므로 모든 스키마 정의는 팀원들과 협의하여 Biz 요구 사항에 맞춰서 다시 모델링 하겠습니다. 👍

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const placeSchema = new Schema({
    placeName:{type:String, required:true},
    category:[String],
    imageUrl:[String],
    location:{
        latitude:{type:String, required:true},
        longitude:{type:String, required:true},
        address:{type:String}
    },
    createdDateTime:{type: String, default:moment().format('YYYY/MM/DD HH:mm:ss')},
    stations:[String],
    tagList:[String],
    description:String,
    upLoader:{type:String, required:true},
    see:{type:Number, default:0},
    likePlace:{type:Number, default:0},
    bookMark:{type:Number, default:0},
    groupCode:String,
    comments :[{type:mongoose.Schema.Types.ObjectId, ref: 'comment'}]
},{versionKey:'_somethingElse'})

module.exports = mongoose.model('place',placeSchema)

```


```javascript
const userSchema = new Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    salt:String,
    phone:{type:String, required:true, unique:true},
    profileImage:String,
    group:[{
        groupCode:{type:String, default:null},
        groupName:String
    }]
})
```


```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName:{type: String, required : true}, //
    groupInfo:String,
    groupImage:String,
    groupIcon:String,
    groupCode:{type:String, unique:true},
    groupAdmin:[String],
    groupMembers:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}]
},{versionKey:'_somethingElse'})
module.exports = mongoose.model('group',groupSchema)
```


```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')
 
const commentSchema = new Schema({
    content: String,
    writer: String,
    comment_date: {type: Date, default:moment().format('YYYY/MM/DD HH:mm:ss')}
})
 
module.exports = mongoose.model('comment', commentSchema);
```

# +...

저는 자신 있습니다.
\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()\
[]()




🐷 귀여워질 자신이요 🐷





- [github](www.github/dudgns3tp)

- [생긴지 얼마안된 개발 블로그](https://velog.io/@dudgns3tp) 

- [인스타그램](https://www.instagram.com/dudgns3tp/?hl=ko)

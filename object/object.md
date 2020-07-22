# 자바스크립트 Object

![JS](https://ncc-phinf.pstatic.net/20161005_222/1475651785984EtfTP_JPEG/01.jpg?type=w646)

이 포스팅을 읽으면...
- 자바스크립트의 Object를 이해할 수 있다.
- Object의 Property와 Method를 이해할 수 있다.

## 객체 (Object)



자바스크립트는 객체 기반의 스크립트 언어이며 자바스크릅트를 이루고있는 **모든것**이 객체이다. 원시타입을 제외한 나머지 값(함수, 배열, 정규표현식, 객체, 날짜, 수학 등)들 모두 객체이다.
대부분 객체로 표현한다고 보면 된다.

> 원시타입(숫자, 문자열, null, undefiend, boolean, symbol) 은  자바스크립트에서 더이상 단순화 할 수 없는 값들을 말한다. 단 숫자, 문자열 Boolean의 경우 new 키워드로 정의된 경우 객체가 될 수 있다.

### 객체의 생성

객체는 두가지 방법으로 생성할 수 있다. 첫 번째 방법으로는 ```new``` 연산자와 Object 생성자 함수를 출하여 빈 객체를 생성 후 프로퍼티 또는 메소드를 추가하여 객체를 만드는 방법이다. 프로퍼티와 메소드가 어떤것인지는 아래 이어서 설명하겠다.

```javascript
let user = new Object();

user.userName = '홍길동';
user.userGender = '남자';
user.introduce = function(){ 
    return `제 이름은 ${this.userName} 이고 성별은 ${this.userGender} 입니다.`
}

console.log(user);
console.log(user.introduce())
```
![객체 생성](https://images.velog.io/images/dudgns3tp/post/0479982c-1a85-411b-a0e1-49c8b7625919/image.png)

두 번째 방법으로는 **객체 리터럴** 방법이다
객체 리터럴 방법은 위 처럼 클래스 기반 객체지향 언어와 비교할때 매우 간편하게 객체를 생성 할 수 있다. 객체를 생성할때 중괄호```{ } ``` 를 사용하여 객체를 생성하는데 중괄호 내에 1개이상의 프로퍼티를 기술하면 해당 프로퍼티가 추가된 객체를 생성 할 수 있다. 

```javascript
let user = {
    userName : "홍길동",
    userGender : "남자",
    introduce : function(){
        return `제 이름은 ${this.userName} 이고 성별은 ${this.userGender} 입니다.`;
    }
};

console.log(user);
console.log(user.introduce())
```

대부분 객체 리터럴 방법으로 이용하여 객체를 생성한다.

또한 객체는 property와 method의 집합이다.  그렇다면 property와 method는 어떻게 생겼을까?? 지금부터 알아보러 가보자~



### 프로퍼티 Property 

Property라는 단어를 번역해보면 소유 라는 뜻을 가지고있는데 말 그대로 객체의 프로퍼티는 객체의 속성을 나타낸다.

프로퍼티 
- **접근 가능한 이름과 활용 가능한 값을 가지는 특별한 형태**
- 특정 객체가 가지고 있는 정보를 품고 있어 그 객체가 가진 정보에 직접적으로 접근 할 수 있게 해준다.

```javascript
let user = {
    userName : "홍길동",
    userGender : "남자"
}

console.log(user);
```
![user객체 로그](https://images.velog.io/images/dudgns3tp/post/fcadf758-d277-46e3-a9af-eed8b6311448/image.png)

userObject 안에 있는 ```userName``` 과 ```userGender```가 ```user``` Object의 property이다. 둘의 관계는 user라는 객체 안에 두개의 property가 user에 대한 정보, 특징을 품고있다고 보면된다. 이처럼 자바스크립트에서 프로퍼티는 

자바스크립트에서 하나의 오브젝트에 접근할때 프로퍼티에 접근하여 값을 추가 하거나 수정, 삭제 할 수 있다. 우선 프로퍼티에 접근할때 두가지 방법이 있다.

1. 점 표기법 접근
2. 브라켓 표키법 접근

#### 프로퍼티 접근하기

```javascript
console.log(user.userName); // 점 표기법
console.log(user["userGender"]); // 브라켓 표기법
```
![프로퍼티 접근](https://images.velog.io/images/dudgns3tp/post/6640df0f-2eef-40a9-8dbd-e03b0a1c1fb2/image.png)

#### 프로퍼티 수정
```javascript
user.userName = "홍진경";
user["userGender"] = "여자"

console.log(user);
```
![프로퍼티 수정](https://images.velog.io/images/dudgns3tp/post/ea94178b-2a5f-496b-b531-8fcc9483f594/image.png)

#### 프로퍼티 삭제
```javascript
delete user.userName;

console.log(user);
```
![삭제](https://images.velog.io/images/dudgns3tp/post/c3c56e94-13c4-4165-b286-8d4380b284eb/image.png)

#### 프로퍼티 추가
 ```javascript
user.address = "서울특별시";
user["userAge"] = 13;
```
 ![추가](https://images.velog.io/images/dudgns3tp/post/ec7a2bef-481b-4a68-b885-e80d5e36a33a/image.png)
 
### 메소드
 프로퍼티 안에 함수를 받는 프로퍼티를 일반적으로 메소드라고 한다.
 ```Javascript
 let user = {
    userName : "홍길동",
    userGender : "남자",
    introduce : function(){
        return `제 이름은 ${this.userName} 이고 성별은 ${this.userGender} 입니다.`;
    }
};

console.log(user.introduce());
```

![메소드](https://images.velog.io/images/dudgns3tp/post/7d8292a4-88db-4857-985f-a3bcd17b3cb7/image.png)

## 마치며..

이로써 자바스크립트의 기본중에 기본 객체를 알아보았다. 자바스크립트에서의 객체는 정말정말 기초중에 매우 가장 중요하다.(사실 중요하지 않은건 없음..) 사람으로 비유하자면 사람으로써 말하는 방법을 배운것과 같다해야하나? 이로써 자바스크립트이 첫 포스팅이 끝났다. 앞으로는 기초 자바스크립트부터.. nodejs express  더 나아가 react 까지 풀스택 자바스크립트 개발자가 되기위한 글을 쓸것이다.
글쓰는 쏨시가 많이 부족하지만 점점 써 나아가면 요령도 생길것 같다 ㅎㅎ

## Reference
https://negabaro.github.io/archive/js-property
https://poiemaweb.com/js-object
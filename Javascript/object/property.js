let user = {
    userName : "홍길동",
    userGender : "남자",
    introduce : function(){
        return `제 이름은 ${this.userName} 이고 성별은 ${this.userGender} 입니다.`;
    }
};

console.log(user);
console.log(user.introduce())
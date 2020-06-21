const clockContainer = document.querySelector(".js-clock"); //js-clock이란 클래스 이름을 가진 친구를 찾는다
const clockTitle = clockContainer.querySelector("h3");

const getTime = () =>{
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours <10 ? `0${hours}` : hours}:${
        minutes<10 ? `0${minutes}` : minutes}:${
            seconds <10 ? `0${seconds}` : seconds
    }`;
}

function init(){
    setInterval(getTime,1000);
}

init();
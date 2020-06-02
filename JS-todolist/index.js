const title = document.querySelector("#title"); // id로찾고싶으면 #title class로 찾고싶으면 .title

const CLICKED_CLASS = "clicked";

const handleClick = ()=>{
    const hasClass =  title.classList.contains(CLICKED_CLASS);
    if(!hasClass){
        title.classList.add(CLICKED_CLASS);
    } else{
        title.classList.remove(CLICKED_CLASS);
    }

}
const init = ()=>{
    title.addEventListener("click", handleClick)
}
init();

/* title.innerHTML = "Hi hello";
title.style.color='red';
document.title="YH";
console.dir(title) 

const BASE_COLOR = "rgb(52, 73, 94)";
const OTHER_COLOR = "#6c5ce7";

function handleClick(){
    if(title.style.color === BASE_COLOR){
        title.style.color = OTHER_COLOR
    }else{
        title.style.color = BASE_COLOR
    }
}
*/


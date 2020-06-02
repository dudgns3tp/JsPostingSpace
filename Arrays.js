const array = [1,2,3,4,5,6,7,8,9,10];
const initValue = 0;

var result = array.reduce((initialValue,currentValue,index,arr)=>{
    return initialValue + currentValue;
},initValue)

console.log(result)


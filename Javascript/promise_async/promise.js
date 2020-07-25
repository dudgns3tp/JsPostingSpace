let value;

const plus = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('plus 시작');
            resolve(a+b);
        }, 1000)
    })
}

const minus = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('minus 는 2초');
            resolve(a-b);
        })
    }, 1000)
}

const multiply = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('multiply 는 3초');
            resolve(a*b);
        })
    } ,1000)
}

const divide = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('divide는 4초');
            resolve(a/b)
        },1000)
    })
}

let result = plus(2, 5)
    .then((result) => minus(result, 1)
    .then((result) => multiply(result, 3)
    .then((result) => divide(result, 2)
    .then((result) => console.log(result)))));
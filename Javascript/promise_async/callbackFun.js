let value;
let plus = function (a, b, callback) {
    let result = a + b;
    callback(result);
}

let minus = function (a, b, callback) {
    callback(a - b);
}

let multiply = function (a, b, callback) {
    callback(a * b);
}

let divide = function (a, b, callback) {
    callback(a / b);
}

value = plus(1, 2, function (res) {
    plus(res, 32, function (res) {
        minus(res, 12, function (res) {
            multiply(res, 2, function (res) {
                divide(res, 5, function (res) {
                    console.log(res);
                    return res;
                })
            })
        })
    })
})

value2 = plus(1, 2, (plusCallback) => {
    plus(plusCallback, 32, (plusCallback) => {
        minus(plusCallback, 12, (minusCallback) =>{
            multiply(minusCallback, 2, (multiplyCallback) =>{
                divide(multiplyCallback, 5, (divideCallback)=>{
                    console.log(divideCallback);
                    return divideCallback;
                })
            })
        })
    })
})

console.log(value2);

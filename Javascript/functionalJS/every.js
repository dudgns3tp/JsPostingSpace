/**
 * 고차함수  every.js
 * 자바스크립트 개발자는 종종 배열의 내용이 숫자인지 객체 등인지 확인해야할 때가 있다. 
 * 이러한 문제를 해결할 때 일반적으로 for 루프를 사용하는데, every 함수로 추상화해보자.
 * every 함수는 배열과 함수라는 두 개의 인자를 취한다. 이 함수는 배열의 모든 요소가 전달된 함수에 대해 참인지 확인한다.
 */

const every = (arr, fn) => {
  let result = true;
  for (let value of arr) {
    result = result && fn(value);
  }
  return result;
}

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));

/**
 * every 함수와 유사하게 some이라는 함수.
 * some 함수는 every 함수와는 완전히 반대로, 전달된 함수에 대해 배열 요소가 참을 반환하면 참을 반환하는 함수다.
 * some 함수는 any 함수라고도 함.
 */
 const some = (arr, fn) => {
   let result = false;
   for(const value of arr) {
     result = result || fn(value)
   }
   return result
 }
 
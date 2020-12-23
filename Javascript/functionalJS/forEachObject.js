const forEachObject = (obj, fn) => {
  for(let property in obj) {
    if(obj.hasOwnProperty(property)) {
      // 인자로 키와 값을 사용해 fn을 호출한다.
      fn(property, obj[property])
    }
  }
}

let object =  { a: 1, b:2 };
forEachObject(object, (k, v) => console.log(k + ":" + v))

const unless = (predicate, fn) => {
  if(!predicate)  {
    fn()
  }
}

const times = (times, fn) => {
  for(let i = 0; i < times; i++) {
    fn(i);
  }
}

times(100, (n) => {
  unless(n % 2, () => console.log(n, "is even"));
})
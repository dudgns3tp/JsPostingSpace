interface PersonInterface {
  name: string;
  age: number;
}

type PersonTypeAlias = {
  name: string;
  age: number;
};

function f8(a: PersonInterface): string {
  return `이름은 ${a.name}이고, 연령대는 ${Math.floor(a.age / 10) * 10}대 입니다.`;
}

console.log(f8({name:'Mark', age: 38}));
console.log('asd')
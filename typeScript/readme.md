## TypeScript

### 나만의 타입을 만드는 방법.


```typescript
// 인터페이스
interface PersonInterface {
  name: string;
  age: number;
}

// 타입 alias
type PersonTypeAlias = {
  name: string;
  age: number;
};

function introduce(a: PersonInterface): string {
  return `이름은 ${a.name}이고, 연령대는 ${Math.floor(a.age / 10) * 10}대 입니다.`;
}

console.log(introduce({name:'Mark', age: 38}));
```

structural type system - 구조가 같으면 같은 타입.
즉,
```typescript
// 인터페이스
interface IPerson {
  name: string;
  age: number;
  speak(): string;
}

// 타입 alias
type PersonType = {
  name: string;
  age: number;
  speak(): string;
};

let personInterface: IPerson = {} as any;
let personType: personType = {} as any;

personInterface = personType;
personType = personInterface;
```

IPerson 의 인터페이스와 PersonType의 타입 Alias를 보면 구조가 같다 따라서 타입스크립트에선 구조가 같으면 같은 타입으로 본다.
타입스크립트에서도 다른방식을 흉내낼 수 있습니다.

nominal type system - 구조가 같아도 이름이 다르면, 다른 타입이다 예시는 아래와 같습니다.
```typescript
type PersonID = string & { readonly brand: unique symbol };

function PersonID(id: string): PersonID {
  return id as PersonID;
}

function getPersonById(id: PersonID) {}

getPersonById(personID('id-aaaaa'));
getPersonById('id-aaaaa'); // error TS2345: Argument of type 'string' ...
```
타입스크립트에선 위와같은 nominal type system을 지원하지 않지만 이런 꼼수를 이용해서 만들 수 있다.

### function

function을 사용하는 방법.
```ts
//type alias
type EatType = (food: string) => void;

// interface
interface IEat { 
  (food: string): void;
}
```

### array

```ts
//type alias
type PersonList = string[];

//interface
interface IPersonList {
  [index: number]: string;
}
```

 ### Intersection
 ```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtistsData {
  artists: { name: string }[];
}

//type alias
type ArtistsResponseType = ArtistsData & ErrorHandling;

//interface
interface IArtistsResponse extends ArtistsData, ErrorHandling {}

let art: ArtistsResponseType;
let iar: IArtistsResponse;
```

### union types

union 타입이란. bird나 fish일때. 또한 union타입으로 만들어진것의 이름을 정할때는 TypeAlias형태로 만든다.
타입 알리아스는 인터페이스에 상속 받거나, 클래스가 구현하는 행위는 제공이 되지 않음.
```ts
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

type PetType = Bird | Fish;

interface IPet extends PetType {} //error TS2312: An interface can only extend an object type or intersection of object types with statically known members.

class Pet implements PetType {} //error TS2422: A class can only implement an object type or intersection of object types with statically known members.
```

### Declaration Merging - interface
선언을 머지할수 있는 기능은 인터페이스에서만 제공이 된다.

```ts
interface MergingInterface {
  a: string;
}

interface MergingInterface {
  b: string;
}

let mi: MergingInterface;
mi.a;
mi.b;

```

이 상황은 다음과 같은 상황에서 일어날수있다.

첫 번째 MergingInterface에 a가 스트링으로 존재하는데, 다른곳에서 MergingInterface 에서 b를 추가로 하면 마지막줄에 선언된 mi는 a, b 모두 접근할 수 있음.
이런경우는 라이브러리를 사용하고 있을때. 그 타입에서 내가 무언가를 추가할때 사용할 수 있다. 

### Declaration Merging - type alias
얘는 안됨

### type Alias vs Interface

- type Alias: 타입의 별칭 의미로 많이 사용. (A라는 타입을 다른 이름으로 부르고 싶을때.) 혹은 이미 있는 타입들을 조합해서 유니온 타입을 만들거나 intersection 타입을 만들때.
- interface: 새로운 타입을 만들어 낼때 주로 사용
구분을 잘하자!

## 서브타입과 슈퍼타입

### 서브타입
보통 집합의 관계에서 포함되는것을 서브타입이라고 말을 한다.

```ts
// sub1 타입은 sup1 타입의 서브 타입이다.
// sup1 타입은 sub1 타입의 슈퍼 타입이다.
let sub1: 1 = 1; //sub1의 타입은 리터럴 타입이다.
let sup1: number = sub1;
sub1 = sup1;

// sub2 타입은 sup2 타입의 서브 타입이다.
// sup2 타입은 sub2 타입의 슈퍼 타입이다.
let sub2: number[] = [1];
let sup2: object = sub2;
sub2 = sup2; 

// sub3 타입은 sup3 타입의 서브 타입이다.
// sup3 타입은 sub3 타입의 슈퍼 타입이다.
let sub3: [number,  number] = [1, 2];
let sup3: number[] = sub3;
sub3 = sup3;
```

위 세 코드를 보자.
보통 sup는 sub를 포함하는 데이터타입 형태로 선언을 해두었고 모든 코드의 3번째라인에는 sub 변수에 sup를 재 할당해주었다. 이때 에러가 발생한다!

### 슈퍼타입





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



## 클래스 정의
ES6에서 새롭게 도입된 클래스는 기존 프로토타입 기반 객체지향 언어보다 클래스 기반 언어에 익숙한 개발자가 보다 빠르게 학습할수 있는 단순명료한 새로운 문법을 제시하고 있다. 하지만 클래스가 새로운 객체지향 모델을 제공하는 것은 아니다. 사실 클래스도 함수이고 기존 프로토타입 기반 패턴의 Syntactic sugar일 뿐이다. Typescript가 지원하는 클래스는 ES6의 클래스와 상당히 유사하지만 몇 가지 Typescript만의 고유한 확장 기능이 있다.

### 1. 클래스 정의
ES6클래스는 클래스 몸체에 메소드만을 포함할 수 있다. 클래스 몸체에 클래스 프로퍼티를 선언할 수 없고 반드시 생성자 내부에서 클래스 프로퍼티를 선언하고 초기화한다.
```js
//person.js
class Person {
  constructor(name) {
    // 클래스 프로퍼티의 선언과 초기화
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}
```
위 예제는 ES6에서 문제없이 실행되는 코드이지만 위 파일의 확장자를 ts로 바꾸어 Typescript 파일로 변경후, 컴파일하면 아래와 같이 컴파일 에러가 발생한다.

```bash
person.ts(4,10): error TS2339: Property 'name' does not exist on type 'Person'.
person.ts(8,25): error TS2339: Property 'name' does not exist on type 'Person'.
```

Typescript 클래스는 클래스 몸체에 클래스 프로퍼티를 사전 선언하여 한다.

```ts
// person.ts
class Person() {
  //클래스 프로퍼티를 사전 선언하여햐 한다
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}

const person = new Person('lee');
person.walk(); // lee is walking
```

### 2. 접근 제한자

Typescript 클래스는 클래스 기반 객체 지향 언어가 지원하는 접근제한자(Access modifier) public, private, protected를 지원하며 의미 또한 기본적으로 동일하다.

단, 접근 제한자를 명시하지 않았을 때, 다른 클래스 기반 언어의 경우, 암묵적으로 protected로 지정되어 패키지 레벨로 공개되지만. Typescript의 경우, 접근 제한자를 생략한 클래스 프로퍼티와 메소드는 암묵적으로 public이 선언된다. 따라서 public으로 지정하고자 하는 멤버 변수와 메소드는 접근 제한자를 생략한다.

접근 제한자를 선언한 프로퍼티와 메소드에 대한 접근 가능성은 아래와 같다.


|접근가능성|public|protected|private|
|:--:|:--:|:--:|:--:|
|클래스 내부|O|O|O|
|자식 클래스 내부|O|O|X|
|클래스 인스턴스|O|X|X|

아래의 예제를 통해 접근 제한자가 선언된 프로퍼티로이 접근 가능성에 대해 살펴보자

```ts
class Foo {
  public x: string;
  protected y: string;
  private z: string;

  constructor(x: string, y: string, z: string) {
    //public, protected, private 접근 제한자 모두 클래스 내부에서 참조 가능하다.
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const foo = new Foo('x', 'y', 'z');

//public 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조 가능하다
console.log(foo.x);

// protected 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
console.log(foo.y);
// error TS2445: Property 'y' is protected and only accessible within class 'Foo' and its subclasses.

//private 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
console.log(foo.z);
// error TS2341: Property 'z' is private and only accessible within class 'Foo'.

class Bar extends Foo {
  constructor(x: string, y: string, z: string) {
    super(x, y, z);

    // public 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
    console.log(this.x);

    //protected 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
    console.log(this.y);
  
    //private 접근 제한자는 자식 클래스 내부에서 참조할 수 없다.
    console.log(this.z);
    // error TS2341: Property 'z' is private and only accessible within class 'Foo'.
  }
}
```

### 3.생성자 파라미터에 접근 제한자 선언
접근 제한자는 생성자 파라미터에도 선언할 수 있다. 이때 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언되고 생성자 내부에서 별도의 초기확 ㅏ없어도 암묵적으로 초기화가 수행된다.

이때 private 접근 제한자가 사용되면 클래스 내부에서만 참조 가능하고 public 접근 제한자가 사용되묜 클래스 외부에서도 참조 가능하다.

```ts
class Foo {
  /**
   * 접근 제한자가 선언된 생성자 파라미터 x 는 클래스 프로퍼티로 선언되고 자동으로 초기화된다. public이 선언되었으므로 x는 클래스 외부에서도 참조 가능하다.
   */
  constructor(public x: string) { }
}

const foo = new Foo('Hello');
console.log(foo); // Foo { x: 'Hello' }
console.log(foo.x); // Hello

class Bar {
  // 접근 제한자가 선언된 생성자 파라미터 x는 멤버 변수로 선언되고 자동으로 초기화된다. private이 선언되었으므로 x는 클래스 내부에서만 참조 가능하다.

  constructor(private x: string) { }
}

const bar = new Bar('Hello');

console.log(bar); // Bar { x: 'Hello' }

//private이 선언됨 bar.x는 클래스 내부에서만 참조 가능하다
console.log(bar.x); // Property 'x' is private and only accessible within class 'Bar'.
```

만일 생성자가 파라미터에 접근 제한자를 선언하지 않으면 생성자 파라미터는 생성자 내부에서만 유효한 지역 변수가 되어 생성자 외부에서 참조가 불가능하게 된다.

```ts
class Foo {
  //x는 생성자 내부에서만 유효한 지역 변수이다.
  constructor(x: string) {
    console.log(x);
  }
}

const foo = new Foo('Hello');
console.log(foo); // Foo {}
```

### readonly키워드

Typescript는 readonly 키워드를 사용할 수 있다. readonly가 선언된 클래스 프로퍼티는 선언 시 또는 생성자 내부에서만 값을 할당할 수 있다. 그 외의 경우에는 값을 할당할 수 없고 오직 읽기만 가능한 상태가 된다. 이를 이용하여 상수의 선언에 사용한다.

```ts
class Foo {
  private readonly MAX_LEN: number = 5;
  private readonly MSG: string;

  constructor() {
    this.MSG = 'hello';
  }

  log() {
    // readonly가 선언된 프로퍼티는 재할당이 금지된다.
    this.MAX_LEN = 10; // Cannot assign to 'MAX_LEN' because it is a constant or a read-only property.
    this.MSG = 'Hi'; // Cannot assign to 'MSG' because it is a constant or a read-only property.

    console.log(`MAX_LEN: ${this.MAX_LEN}`); // MAX_LEN: 5
    console.log(`MSG: ${this.MSG}`); // MSG: hello
  }
}
```


### static 키워드

ES6클래스에서 static 키워드는 클래스의 정적(static) 메소드를 정의한다. 정적 메소드는 클래스의 인스턴스가 아닌 클래스 이름으로 호출한다. 따라서 클래스의 인스턴스를 생성하지 않아도 호출할 수 있다.

```ts
class Foo {
  constructor(prop) {
    this.prop = prop;
  }

  static staticMethod() {
    /**
    정적 메소드는 this를 사용할 수 없다.
    정적 메소드 내부에서 this는 클래스의 인스턴스가 아닌 클래스 자신을 가리킨다.
    */
   return 'staticMethod';
  }

  prototypeMethod() {
    return this.prop;
  }
}

// 정적 메소드는 클래스 이름으로 후출한다.
console.log(Foo.staticMethod());

const foo = new Foo(123);
//정적 메소드는 인스턴스로 호출할 수 없다.
console.log(foo.staticMethod()); // Uncaught TypeError: foo.staticMethod is not a function
```

Typescript에서는 static 키워드를 클래스 프로퍼티에도 사용할 수 있다. 정적 메소드와 마찬가지로 정적 클래스 프로퍼티는 인스턴스가 아닌 클래스 이름으로 호출하며 클래스의 인스턴스를 생성하지 않아도 호출할 수 있다.

```ts
class Foo {
  // 생성된 인스턴스의 갯수
  static instanceCounter = 0;
  constructor() {
    // 생성자가 호출될 때마다 카운터를 1씩 증가시킨다.
    Foo.instanceCounter++;
  }
}

var foo1 = new Foo();
var foo2 = new Foo();

console.log(Foo.instanceCounter); // 2
console.log(foo2.instanceCounter); // error TS2339: Property 'instanceCounter' does not exist on type 'Foo'.
```

### 6. 추상 클래스
추상클래스(abstract class)는 하나 이상의 추상 메소드를 포함하며 일반 메소드도 포함할 수 있다. 추상 메소드는 내용이 없이 메소드 이름과 타입만이 선언된 메소드를 말하며 선언할때 abstract 키워드를 사용한다. 추상 클래스를 정의할때는 abstract 키워드를 사용하며, 직접 인스턴스를 생성할 수 없고 상속만을 위해 사용된다. 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여햐 한다.

```ts
abstract class Animal {
  //추상 메서드
  abstract makeSound(): void;

  //일반 메소드
  move(): void {
    console.log('roaming the earth...');
  }
}
  // 직접 인스턴스를 생성할 수 없다.
  // new Animal();
  // error TS2511: Cannot create an instance of the abstract class 'Animal'.
class Dog extends Animal {
  //추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다.
  makeSound() {
    console.log('bowowow~~');
  }
}
const myDog = new Dog();
myDog.makeSound();
myDog.move();
```
// sub1 타입은 sup1 타입의 서브 타입이다.
let sub1: 1 = 1; //sub1의 타입은 리터럴 타입이다.
let sup1: number = sub1;
sub1 = sup1;

// syb2 타입은 sup2타입의 서브 타입이다.
let sub2: number[] = [1];
let sup2: object = sub2;
sub2 = sup2; 

//sub3 타입은 sup3타입의 서브 타입이다.
let sub3: [number,  number] = [1, 2];
let sup3: number[] = sub3;
sub3 = sup3;

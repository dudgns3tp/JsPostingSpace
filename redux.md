
# 리덕스 라이브러리
> 본 내용은 velopert님의 ```리액트를 다루는 기술```책에서 정리한 내용입니다.

 리덕스([Usage with React | Redux](https://redux.js.org/basics/usage-with-react)) 는 리액트 상태 관리 라이브러리 입니다.
리덕스를 사용하면 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜 효율적인 관리에 용이합니다.!

리덕스를 사용하면서 접하게될 키워드의 개념부터 간략하게 알아보겠습니다.

### 액션

상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생합니다. 이는 다음과같은 형식으로 이루어 져있습니다.
```javascript
{
	type:’TOGGLE_VALUE’
}
```

액션은 type 필드를 반드시 가지고 있어야 합니다. 이값을 액션의 이름이라고 생각하면 됩니다. 그리고 그 이외의 값들은 나중에 상태 업데이트를 할 때 참고해야 할 값이며, 작성자가 마음대로 넣을 수 있습니다.

다음은 예시 액션입니다.
```javascript
{
	type:'ADD_TODO',
	data:{
		id:1,
		text:'리덕스 배우기'
	}
}
{
	type : 'CHANGE_INPUT',
	text : '안녕하세요'
}
```


### 액션 생성 함수
액션 생성 함수(action creator)는 액션 객체를 만들어 주는 함수입니다.
```javascript
function addTodo(data){
	return {
		type:'ADD_TODO',
		data
	}
};

const changeInput = text =>({
	type : 'CHANGE_INPUT',
	text
});
```

어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수 있고, 만드는 과정에서 실수로 정보를 놓칠 수 도 있습니다.  이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.

### 리듀서

리듀서는 변화를 일으키는 함수입니다. 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전다받은 액션 객체를 파라미터로 받아옵니다. 그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해줍니다.

> 리듀서 코드
``` javascript
const initialState = {
	counter: 1
}
function reducer(state = initialState, action){
	switch (action.type){
		case INCREMENT:
			return{
				counter: state.counter + 1
			};
		default:
			return state;
	}
}
```


### 스토어

프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만듭니다. 한 개의 프로제그는 단 하나의 스토어만 가질 수 있습니다. 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 지닙니다.

### 디스패치

디스패치(dispatch)는 스토어의 내장 함수중 하나입니다. 디스패치는 ‘액션을 발생시키는 것’이라고 이해하면 됩니다. 이 함수는 ```dispatch(action)```
과 같은 형태로 액션 객체를 파라미로 넣어서 호출합니다.
이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 줍니다.

### 구독

구독(subscribe) 도 스토어의 내장 함수 중 하나입니다.  Subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면, 이 리스너 함수가 액션이 디스패치 되어 상태가 업데이트 될 때마다 호출됩니다.

``` javaScript
const listener = () =>{
	console.log('상태가 업데으티 됨');
}
const unsubscribe = store.subscribe(listner);

unsubscribe(); // 추후 구독을 비활성화 할때 함수를 호출
```








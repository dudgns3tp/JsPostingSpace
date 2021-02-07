interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

let todos: Todo[] = [];

//파라미터 todo의 타입으로 Todo 인터페이스를 선언하였다.
function addTodo(todo: Todo) {
  todos = [...todos, todo]
}

//파라미터 todo는 Todo 인터페이스를 준수하여야 한다.
const newTodo: Todo = { id: 1, content: 'TS', completed: false };
addTodo(newTodo);
console.log(todos)
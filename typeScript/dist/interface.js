var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var todos = [];
//파라미터 todo의 타입으로 Todo 인터페이스를 선언하였다.
function addTodo(todo) {
    todos = __spreadArrays(todos, [todo]);
}
//파라미터 todo는 Todo 인터페이스를 준수하여야 한다.
var newTodo = { id: 1, content: 'TS', completed: false };
addTodo(newTodo);
console.log(todos);

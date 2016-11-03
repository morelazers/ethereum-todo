pragma solidity ^0.4.2;

contract TodoApp {

	// Create the structure for the Todo
	struct Todo {
    string text;
    string status;
    uint id;
  }

	uint numberOfTodos = 0;
	mapping (address => Todo[]) todos;

	event AddTodo(address indexed _owner, uint newTodoId);
	function addTodo(string text) returns(bool sufficient) {
		todos[msg.sender].push(Todo(text, "not_completed", numberOfTodos));
		numberOfTodos = todos[msg.sender].length;
		numberOfTodos++;
		AddTodo(msg.sender, numberOfTodos);
		return true;
	}

	function getNumberOfTodos() returns(uint) {
		return todos[msg.sender].length;
	}

	function getTodo(uint todoId) returns(string, string, uint) {
		Todo thisTodo = todos[msg.sender][todoId];
		return (thisTodo.text, thisTodo.status, thisTodo.id);
	}

	event CompleteTodo(address indexed _owner, string newStatus, uint todoId);
	function completeTodo(uint todoId) returns(bool sufficient) {
		todos[msg.sender][todoId].status = "completed";
		CompleteTodo(msg.sender, todos[msg.sender][todoId].status, todoId);
		return true;
	}

	function getTodoStatus(uint todoId) returns(string) {
		return todos[msg.sender][todoId].status;
	}

	event DeleteTodo(address indexed _owner, string newStatus, uint todoId);
	function deleteTodo(uint todoId) returns(bool sufficient) {
		todos[msg.sender][todoId].status = "deleted";
		DeleteTodo(msg.sender, todos[msg.sender][todoId].status, todoId);
		return true;
	}
}

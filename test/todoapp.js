contract('TodoApp', function(accounts) {
  it("should have 0 todos for the account on start", function() {
    var todoContract = TodoApp.deployed();

    return todoContract.getNumberOfTodos.call(accounts[0]).then(function(number) {
      assert.equal(number.valueOf(), 0, "there were not 0 todos");
    });
  });

  it("should add a todo", function() {
    var todoContract = TodoApp.deployed();
    return todoContract.addTodo("Example todo", {from: accounts[0]}).then(function() {
      return todoContract.getNumberOfTodos.call(accounts[0]).then(function(number) {
        assert.equal(number.valueOf(), 1, "there was no todo added");
      })
    });
  });

  it("should complete a todo", function() {
    var todoContract = TodoApp.deployed();
    return todoContract.completeTodo(0, {from: accounts[0]}).then(function(val) {
      return todoContract.getTodoStatus.call(0, {from: accounts[0]}).then(function(status) {
        assert.equal(status.valueOf(), "completed", "the todo was not completed");
      });
    });    
  });

  it("should delete a todo", function() {
    var todoContract = TodoApp.deployed();
    return todoContract.deleteTodo(0, {from: accounts[0]}).then(function(val) {
      return todoContract.getTodo.call(0, {from: accounts[0]}).then(function(todo) {
        assert.equal(todo.valueOf()[1], "deleted", "the todo was not deleted");
      });
    });    
  });

});
var accounts;
var account;

function completeTodo(todoId) {
  var todoContract = TodoApp.deployed();
  var completeEvent = todoContract.CompleteTodo(parseInt(todoId), {_owner: accounts[0]});
  completeEvent.watch(function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    refreshTodos();
  });
  todoContract.completeTodo(todoId, {from: accounts[0]});
}

function deleteTodo(todoId) {
  var todoContract = TodoApp.deployed();
  var deleteEvent = todoContract.DeleteTodo(parseInt(todoId), {_owner: accounts[0]});
  deleteEvent.watch(function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    refreshTodos();
  })
  todoContract.deleteTodo(parseInt(todoId), {from: account});
}


function refreshTodos() {
  var todoContract = TodoApp.deployed();
  todoContract.getNumberOfTodos.call({from: account}).then(function(value) {
    var numberOfTodos = value.valueOf();
    console.log(numberOfTodos);

    var todoList = document.getElementById("todos");
    todoList.innerHTML = "";

    var todos = [];
    for (var i = 0; i < numberOfTodos; i++) {
      todoContract.getTodo.call(i, {from: account}).then(function(value) {
        todo = value.valueOf();
        if (todo[1] === "deleted") return;
        todoList.innerHTML += constructTodoHtml(todo);
      }).catch(function(e) {
        console.log(e);
        console.log("Error getting todos");
      });
    }

  }).catch(function(e) {
    console.log(e);
  });
};

function addTodo() {
  var todoContract = TodoApp.deployed();

  var text = document.getElementById("todo-text").value;

  todoContract.addTodo(text, {from: account}).then(function() {
    refreshTodos();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error adding todo; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(error, accs) {
    if (error != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    account = accounts[0];
    refreshTodos();
  });
}

function constructTodoHtml(todoItem) {
  var todoHtml = 
      "<br/>"
    + "<div class=\"todo-item\">"
    +   "<span class=\"pull-left " + todoItem[1] + "\">" + todoItem[0] + "</span>"
    +   "<span class=\"pull-right\">"
    +     "<button onClick=\"completeTodo("+todoItem[2].valueOf()+")\">Complete</button>"
    +     "<button onClick=\"deleteTodo("+todoItem[2].valueOf()+")\">Delete</button>"
    +   "</span>"
    + "</div>";
  return todoHtml;
}

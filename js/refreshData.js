//refresh the todo list
function refreshTodo(transaction, results){
  var todoTask = "";
  var todoList =


  //if data table is empty
  if(results.rows.length == 0){
    todoList.innerHTML = "EMPTY";
  }
  else{
    for(var i = 0; i<results.row.length; i++){
        var todoRaw  = results.rows.item(i);

        //enter createdate
        var dataEntry= todoRaw.date;

        //display the todo entry
        todoList.innerHTML += "";
    }
  }
}

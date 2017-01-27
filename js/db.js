//connect the websql db
if(window.openDatabase){
  var db = openDatabase("todo_db","0.1","todo_entry",2*1024*1024);

  //start transactions
  db.transaction(function(t){
    t.executeSql("CREATE TABLE IF NOT EXISTS todo_db( \
                  todoID INTEGER PRIMARY KEY ASC, \
                  heading   TEXT, \
                  desc      TEXT, \
                  fdate     TEXT, \
                  edate     TEXT, \
                  allday    TEXT, \
                  tag       TEXT \
                )");
  });
}
else{
  alert("DB ERROR OCCURED");
  console.log("DB ERROR");
}

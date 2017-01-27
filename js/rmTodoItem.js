function rmTODO(){
  //check databse connection
  if(db){
    db.transaction(function(t){
      t.executeSql("DELETE FROM todo_db \
                    WHERE todoID=?", [],refreshTodo);
    })
  }
}

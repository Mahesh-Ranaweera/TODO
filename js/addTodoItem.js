//Add todo items
function addTODO(){
  //check database connection
  if(db){
    //get input data from the submit form
    var todo_heading =
    var todo_desc    =
    var todo_fdate   =
    var todo_edate   =
    var todo_allday  =
    var todo_tag     =

    //check for header is available
    if(todo_heading != NULL){
      db.transaction(function(t){
        //insert the new todo entry into the database
        t.executeSql("INSERT INTO todo_db (heading, desc, fdate, edate, allday, tag) \
                      VALUES (?,?,?,?,?,?)",
                      [todo_heading, todo_desc, todo_fdate, todo_edate, todo_allday, todo_tag]
                    );
      });
    }
    else{
      alert("YOU NEED TO HAVE A HEADING");
    }
  }
}

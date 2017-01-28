//connect the websql db
if (window.openDatabase) {
    var db = openDatabase("todo_db", "0.1", "todo_entry", 2 * 1024 * 1024);

    //start transactions
    db.transaction(function(t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS todo_db( \
                  todoID INTEGER PRIMARY KEY AUTOINCREMENT, \
                  heading   TEXT, \
                  desc      TEXT, \
                  sdate     TEXT, \
                  stime     TEXT, \
                  edate     TEXT, \
                  etime     TEXT, \
                  allday    TEXT, \
                  tag       TEXT \
                )");
        
        console.log("DB CREATED");

        //debug point for websql testing
        /*
        t.executeSql("INSERT INTO todo_db (heading, desc, sdate, stime, edate, etime, allday, tag) \
                      VALUES ('test','test','test','test','test','test','test','test')");
        console.log("TEST DB CREATED");
        */
    });
} else {
    console.log("DB ERROR OCCURED");
}


//Add todo items
function addTODO() {
    //check database connection
    if (db) {
        //get input data from the submit form
        var todo_heading = document.getElementById("todo-header").value;
        var todo_desc       = document.getElementById("todo-desc").value;
        var todo_sdate = document.getElementById("todo-sdate").value;
        var todo_stime = document.getElementById("todo-stime").value;
        var todo_edate = document.getElementById("todo-edate").value;
        var todo_etime = document.getElementById("todo-etime").value;
        var todo_allday = document.getElementById("todo-allday").value;
        var todo_tag = document.getElementById("todo-tag").value;

        //debug point for output testing
        /*
        var test = document.getElementById("test");
        test.innerHTML = todo_heading + " " + todo_desc; 
        */

        //check for header is available
        if (todo_heading != '' && todo_sdate != '') {
            db.transaction(function(t) {
                //insert the new todo entry into the database
                t.executeSql("INSERT INTO todo_db (heading, desc, sdate, stime, edate, etime, allday, tag) \
                              VALUES (?,?,?,?,?,?,?,?)", 
                              [todo_heading, todo_desc, todo_sdate, todo_stime, todo_edate, todo_etime, todo_allday, todo_tag]
                            );
                
                console.log("NEW TODO ENTRY");
                
                //close the addtodo window and refresh the todolist
                exitBtn("app-todoadd");
                displayTodo();
            });
        } else {
            alert("YOU NEED TO HAVE A HEADING AND A START DATE");
            console.log("INCOMPLETE SUBMIT")
        }
    }
}

//display todo list
function displayTodo() {
    if (db) {
        db.transaction(function(t) {
            // display data from the db
            t.executeSql("SELECT * FROM todo_db \
                          ORDER BY sdate ASC", [], refreshTodo);
        });
    } else {
        console.log("LIST DISPLAY ERROR")
    }
}

//refresh the todo list
function refreshTodo(transaction, results) {
    var todoList = document.getElementById("app-content");
    var todoTask = '';
    //delcaring todo html snippets
    var cardHead = '<div class="todo-wrapper"><div class="todo">';
    var cardFoot = '</div></div>';
    
    //clear the todolist
    todoList.innerHTML = "";
    

    //if data table is empty
    if (results.rows.length == 0) {
        todoList.innerHTML = "EMPTY";
        console.log("DB EMPTY");
    } else {
        for (var i = 0; i < results.rows.length; i++) {
            var todoRaw = results.rows.item(i);

             //debug point for checking retrieve data
            /*
            todoList.innerHTML += todoRaw.heading;
            */
            todoTask = ''; 
            todoTask = '<div class="todo-wrapper"><div class="todo"><div class="todo-header"><div class="ring"></div>'+todoRaw.heading+'</div>';
            
            if(todoRaw.desc != ''){
                todoTask += '<div class="todo-content-blocks">' + todoRaw.desc + '</div>';
            }
            
            //todo footer
            todoTask += '<div class="todo-footer">';
            
            if(todoRaw.sdate != null){
                todoTask += '<div class="todo-footer-block width-100"><div class="todo-footer-icons"><i class="fa fa-clock-o" aria-hidden="true"></i></div><div class="todo-footer-icon-lbl">' + todoRaw.sdate + todoRaw.stime;
                if(todoRaw.stime != ''){
                    todoTask += ' @ ' + todoRaw.stime;
                }
                todoTask += '</div></div>';
            }
            /*
            if(todoRaw.edate != ''){
                //todoTask
            }
            if(todoRaw.etime != ''){
                //todoTask
            }
            if(todoRaw.allday != ''){
                //todoTask
            }
            if(todoRaw.tag != ''){
                //todoTask
            } 
            */
            
            //delete button
            //todoTask += '<div class="todo-footer-block"><div class="todo-footer-icons"><a href="javascript:void(0);" onclick="removeTodo(' + todoRow.idtodo + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div>';
            
            //todo footer end
            todoTask += '</div>';
            
            todoTask += '</div></div>';
            
            todoList.innerHTML += todoTask;
            
            
            /*
                                            <div class="todo-header"> \
                                                <div class="ring"></div>'+todoRaw.heading+' \
                                            </div> \
                                            <div class="todo-content-blocks">Content</div> \
                                            <div class="todo-footer"></div> \
                                        </div> \
                                    </div>';  */
            
            
            /*
            todoList.innerHTML += cardHead+'<div class="todo-header"><div class="ring"></div>'+todoRaw.heading+'</div>';
            
            if(todoRaw.desc != null){
                todoList.innerHTML += '<div class="todo-content-blocks">' + todoRaw.desc + '</div>';
            }
            
            todoList.innerHTML += '<div class="todo-footer"></div>';
            
            todoList.innerHTML += cardFoot; */
            
            /*
            
                <div class="todo-content-blocks">Content</div> \
                <div class="todo-footer"></div>'+cardFoot;
            
            */
            
            
            
            
            /*
            if(todoRaw.sdate != null){
                todoList.innerHTML += '<div class="todo-footer-block width-100"> \
                                            <div class="todo-footer-icons"> \
                                                <i class="fa fa-clock-o" aria-hidden="true"></i> \
                                            </div> \
                                            <div class="todo-footer-icon-lbl">' + todoRaw.sdate + '</div> \
                                        </div>';
            }
            if(todoRaw.stime != null){

            }
            if(todoRaw.edate != null){

            }
            if(todoRaw.etime != null){

            }
            if(todoRaw.allday != null){

            }
            if(todoRaw.tag != null){

            }
            todoList.innerHTML += '<div class="todo-footer-block"> \
                                        <div class="todo-footer-icons"> \
                                            <a href="javascript:void(0);" onclick="removeTodo('+ todoRaw.todoID + ');"> \
                                                <i class="fa fa-trash-o" aria-hidden="true"></i> \
                                            </a> \
                                        </div> \
                                    </div>';
            */
            
        }
    }
}

function removeTodo(todoID) {
    //check status of db available
    if (db) {
        db.transaction(function(t) {
            t.executeSql("DELETE FROM todo_db WHERE todoID=?", [todoID], displayTodo);
        });
    } else {
        console.log("ERROR DELETING TODO id:" + todoID);
    }
}
displayTodo();
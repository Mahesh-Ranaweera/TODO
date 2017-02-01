//Import dependencies
var $ = require('jQuery');
//global data
var curr_date = new Date();

var curr_year = curr_date.getFullYear();
var curr_month = curr_date.getMonth() + 1;
var curr_day = curr_date.getDate();

//console.log(curr_year, curr_day, curr_month);


//connect the websql db
if (window.openDatabase) {
    //Open the database 
    var db = openDatabase("tododb", "0.1", "todo_entry", 2 * 1024 * 1024);

    //start transactions
    db.transaction(function(t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS tododb ( \
                    todoID INTEGER PRIMARY KEY ASC, \
                    heading   TEXT, \
                    desc      TEXT, \
                    sdate     DATE, \
                    stime     TIME, \
                    edate     DATE, \
                    etime     TIME, \
                    tag TEXT )");

        console.log("DB CREATED");

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
        var todo_desc = document.getElementById("todo-desc").value;
        var todo_sdate = document.getElementById("todo-sdate").value;
        var todo_stime = document.getElementById("todo-stime").value;
        var todo_edate = document.getElementById("todo-edate").value;
        var todo_etime = document.getElementById("todo-etime").value;
        var todo_tag = document.getElementsByName("tag-color");

        var color_tag;
        //Tags 
        for (var i = 0, length = todo_tag.length; i < length; i++) {
            if (todo_tag[i].checked) {
                // get the tag color and apply it to the div on render
                color_tag = todo_tag[i].value;
                console.log(color_tag);
                break;
            }
        }
        //check for header is available
        if (todo_heading != '' && todo_sdate != '' && todo_edate != '') {
            db.transaction(function(t) {
                //insert the new todo entry into the database
                t.executeSql("INSERT INTO tododb (heading, desc, sdate, stime, edate, etime, tag) \
                              VALUES (?, ?, ?, ?, ?, ?, ?)", [todo_heading, todo_desc, todo_sdate, todo_stime, todo_edate, todo_etime, color_tag]);

                console.log("NEW TODO ENTRY");

                //close the addtodo window and refresh the todolist
                exitBtn("app-todoadd");
                displayTodo();
            });
        } else {
            alert("YOU NEED TO HAVE A HEADING, A START DATE AND A END DATE");
            console.log("INCOMPLETE SUBMIT");
        }
    }
}

//display todo list
function displayTodo() {
    if (db) {
        db.transaction(function(t) {
            // display data from the db
            t.executeSql("SELECT * FROM tododb ORDER BY sdate ASC", [], refreshTodo);
        });
    } else {
        console.log("LIST DISPLAY ERROR");
    }
}


//refresh Todo list with new data
function refreshTodo(transaction, results) {
    var todoList = document.getElementById("app-content");

    //clear the todolist
    todoList.innerHTML = '';

    //if data table is empty
    if (results.rows.length == 0) {
        todoList.innerHTML = "EMPTY";
        console.log("DB EMPTY");
    } else {
        for (var i = 0; i < results.rows.length; i++) {
            var todoRow = results.rows.item(i);

            var sdate_init = todoRow.sdate;
            var edate_init = todoRow.edate;

            var sdate_arr = sdate_init.split('-');
            var edate_arr = edate_init.split('-');

            //get the year
            var syear = parseInt(sdate_arr[0]);
            var eyear = parseInt(edate_arr[0]);
            //get the month
            var smonth = parseInt(sdate_arr[1]);
            var emonth = parseInt(edate_arr[1]);
            //get the date
            var sday = parseInt(sdate_arr[2]);
            var eday = parseInt(edate_arr[2]);

            //console.log(sday + '_' + curr_day, smonth + '_' + curr_month, syear + '_' + curr_year, eday, emonth, eyear)

            //check for date and delete if expired
            if (eyear < curr_year) {
                deleteOldTodo(todoRow.todoID);
            } else if (emonth < curr_month && eyear == curr_year) {
                deleteOldTodo(todoRow.todoID);
            } else {
                todoList.innerHTML += formatCard(todoRow.todoID, todoRow.heading, todoRow.desc, todoRow.sdate, todoRow.stime, todoRow.edate, todoRow.etime, todoRow.tag);
            }

            //todoList.innerHTML += formatCard(todoRow.todoID, todoRow.heading, todoRow.desc, todoRow.sdate, todoRow.stime, todoRow.edate, todoRow.etime, todoRow.tag);

        }
    }
}

function formatCard(todoid, todoheading, tododesc, todosdate, todostime, todoedate, todoetime, todotag) {
    var todoTask = '';

    todoTask += '<div class="todo-wrapper"><div class="todo" style="background-color: ' + todotag + ' !important; color: #34495e;"><div class="todo-header"><div class="ring"></div>' + todoheading + '</div>';

    if (tododesc != null) {
        todoTask += '<div class="todo-content-blocks">' + tododesc + '</div>';
    }

    //open the footer
    todoTask += '<div class="todo-footer">';

    if (todosdate != '') {
        todoTask += '<div class="todo-footer-block width-50"><div class="todo-footer-icons"><i class="fa fa-clock-o" aria-hidden="true"></i> \
                        </div><div class="todo-footer-icon-lbl">' + todosdate + '</div></div>';
    }
    if (todostime != '') {
        todoTask += '<div class="todo-footer-block width-50"><div class="todo-footer-icons"><i class="fa fa-clock-o" aria-hidden="true"></i> \
                        </div><div class="todo-footer-icon-lbl">' + todostime + '</div></div>';
    }
    if (todoedate != '') {
        todoTask += '<div class="todo-footer-block width-50"><div class="todo-footer-icons"><i class="fa fa-clock-o" aria-hidden="true"></i> \
                        </div><div class="todo-footer-icon-lbl">' + todoedate + '</div></div>';
    }
    if (todoetime != '') {
        todoTask += '<div class="todo-footer-block width-50"><div class="todo-footer-icons"><i class="fa fa-clock-o" aria-hidden="true"></i> \
                        </div><div class="todo-footer-icon-lbl">' + todoetime + '</div></div>';
    }

    //close the footer and delete button
    todoTask += '<div class="todo-footer-block width-100"><div class="todo-footer-icons"><a href="javascript:void(0);" onclick="removeTodo(' + todoid + ');"> \
                        <i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div>';
    todoTask += '</div>';

    todoTask += '</div></div>';

    return todoTask;
}

//Delete expired entry
function deleteOldTodo(todoID) {
    if (db) {
        db.transaction(function(t) {
            t.executeSql("DELETE FROM tododb WHERE todoID=?", [todoID]);
            console.log("DELETED OLD TODO ENTRY " + todoID);
        });
    }
}

//Deleting the todo item
function removeTodo(todoID) {
    //check status of db available
    if (db) {
        var msg = confirm("DO YOU WANT TO DELETE");
        if (msg == true) {
            db.transaction(function(t) {
                t.executeSql("DELETE FROM tododb WHERE todoID=?", [todoID], displayTodo);
            });
        } else {
            return;
        }

    } else {
        console.log("ERROR DELETING TODO id:" + todoID);
    }
}
displayTodo();
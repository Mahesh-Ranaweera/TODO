//open the database connection

if(window.openDatabase){
    //create the database for the todo
    // required fields are Date, Task, Description, and Tag : database size> 2*1024*1024 = 2MB
    var db = openDatabase("tododb","0.1","todo_database", 2*1024*1024);
    
    db.transaction(function(t){
        t.executeSql("CREATE TABLE IF NOT EXISTS todotb (idtodo INTEGER PRIMARY KEY ASC, date TEXT, task TEXT, desc TEXT, tag TEXT)");
        
        //test query
        //t.executeSql("INSERT INTO todotb (date, task, desc, tag) VALUES (2016, games, description, tag)");
    });
}
else{
    alert("Something went wrong!");
}

//add items to todo list
function addTodo(){
    //check status of db is available
    if(db){
        //get info from the input panel
        var date  = document.getElementById("date_txt").value;
        var task  = document.getElementById("task_txt").value;
        var desc  = document.getElementById("desc_txt").value;
        var tag   = document.getElementById("tag_txt").value;
        
        //check weather data is entered into the inputs
        if (date != "" && task != "" && desc !="" && tag != ""){
            
            //enter the values into the db
            db.transaction(function(t){
                t.executeSql("INSERT INTO todotb (date, task, desc, tag) VALUES (?, ?, ?, ?)", [date, task, desc, tag]);
                
                //close the input panel
                visibleOFF();
                displayTodo();
            });
        }
        else{
            alert("You have to fill all the blanks");
        }
    }
    else{
        alert("Something went wrong!");
    }
}

//display todo list
function displayTodo(){
    //check status of db is available
    if(db){
        //get info from the db
        db.transaction(function(t){
            // * means select all from the given table
            t.executeSql("SELECT * FROM todotb ", [], refreshTodo);
        });
    }
    else{
        alert("Something went wrong!");
    }
}

//refresh the todolist: after add and delete item
function refreshTodo(transaction, results){
    var todoTask = "";
    var todoList = document.getElementById("card_center_wrapper");
    
    todoList.innerHTML = "";
    
    //id the table is emplty
    if(results.rows.length == 0){
        todoList.innerHTML = "<div id='lonelymsg'></div>";
    }
    else{
            for(var i = 0; i < results.rows.length; i++){
            //info from each row
            var todoRow = results.rows.item(i);

            //get the date and remove each content as year, month and date
            var dateEntry = todoRow.date;
            
            /* reserved for future dev
            var arrayDate = dateEntry.split("-");

            var year = arrayDate[0];
            var month= arrayDate[1];
            var curdate = arrayDate[2];  */

            //display the info in todo cards
            todoList.innerHTML += "<div id='todo_card'><div class='todo_info'><div class='card_task'>"+todoRow.task+"</div><div class='card_Description'>"+todoRow.desc+"</div><div class='block'><div class='card_small_info'>Date: "+dateEntry+"</div><div class='card_small_info'>Tag: "+todoRow.tag+"</div></div></div><a href='javascript:void(0);' onclick='removeTodo(" + todoRow.idtodo + ");'><div class='delete_btn smooth'><div class='deletebtn smooth'></div></div></a></div>";
        }
    }
}

function removeTodo(idtodo){
    //check status of db available
    if(db){
        db.transaction(function(t){
            t.executeSql("DELETE FROM todotb WHERE rowid=?", [idtodo], displayTodo);
        });
    }
    else{
        alert("Something went wrong!");
    }
}

displayTodo();
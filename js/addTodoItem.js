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
        var todo_allday = document.getElementById("todo-allday").value;
        var todo_tag = document.getElementById("todo-tag").value;

        //debug point for output testing
        /*
        var test = document.getElementById("test");
        test.innerHTML = todo_heading + " " + todo_desc; 
        */

        //check for header is available
        if (todo_heading != '') {
            db.transaction(function(t) {
                //insert the new todo entry into the database
                t.executeSql("INSERT INTO todo_db (heading, desc, sdate, stime, edate, etime, allday, tag) \
                      VALUES (?,?,?,?,?,?,?,?)", [todo_heading, todo_desc, todo_sdate, todo_stime, todo_edate, todo_etime, todo_allday, todo_tag]);
                console.log("NEW TODO ENTRY");
            });
        } else {
            alert("YOU NEED TO HAVE A HEADING");
        }
    }
}
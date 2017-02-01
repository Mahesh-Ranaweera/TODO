//APP test
//Test functions of the TODO app {test cases}
function apptest() {
    console.clear();
    console.log("%c APP TEST CONSOLE ", "color: #16a085");
    console.log("%c AVAILABLE TESTS >", "color: #1abc9c");
    console.log("%c 1. SHOW DB:           test_show_db()", "color: #1abc9c");
    console.log("%c 2. CREATE_DB:         test_create_db()", "color: #1abc9c");
    console.log("%c 3. DROP_DB:           test_drop_db()", "color: #1abc9c");
    console.log("%c 4. POPULATE DB:       test_pop_db()", "color: #1abc9c");
    console.log("%c 5. CUSTOM DATA ENTRY: test_add_todo() {require to enter: heading = '', desc = '', sdate = 'YYYY-MM-DD', stime = 'HH:MM', edate = 'YYYY-MM-DD', etime = 'HH:MM', tag = '#000000' }", "color: #1abc9c");
    console.log("%c 6. DELETE ENTRY:      test_del_entry() {require to enter: todo_id = ''}", "color: #1abc9c");
    console.log("%c ================================================================================================================================================================================= ", "color: #34495e");
}

function getdata() {
    if (db) {
        db.transaction(function(t) {
            t.executeSql("SELECT * FROM tododb", [], data)
        });
    }
}

function data(transaction, results) {
    if (results.rows.length == 0) {
        console.log("%c DATABASE EMPTY", "color: #c0392b");
    } else {
        console.log("%c DATABASE EXIST", "color: #2196F3");
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            console.table([row.todoID, row.heading, row.desc, row.sdate, row.stime, row.edate, row.etime, row.tag]);
        }
    }
}

//DB show
function test_show_db() {
    getdata();
}

//create DB
function test_create_db() {
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

        console.log("%c >> DATABASE CREATED", "color: #2196F3");
    });
}

//drop DB
function test_drop_db() {
    if (db) {
        db.transaction(function(t) {
            t.executeSql("DROP TABLE tododb");
            console.log("%c >> DATABASE DELETED", "color: #c0392b");
            getdata();
            displayTodo();
        });
    }
}

//Add todo test: with custom data entry
function test_add_todo() {
    console.log("%c >> TEST DATABASE", "color: #2196F3");

    // console prompt doesn't work in electron, so had to predefine entries
    // works on webbrowser : var heading = prompt("Enter Todo Heading:", "");

    if (tag == '') {
        var tag = "#FFFFFF";
    }

    try {
        db.transaction(function(t) {
            try {
                t.executeSql("INSERT INTO tododb (heading, desc, sdate, stime, edate, etime, tag) \
                      VALUES (?,?,?,?,?,?,?)", [heading, desc, sdate, stime, edate, etime, tag]);

                console.log("NEW TODO ENTRY");
                displayTodo();
            } catch (err) {
                console.log(err + " > REQUIRE HEADING");
            }
        })
    } catch (err) {
        console.log(err + " > DB TRANSACTION ERROR");
        //test_add_todo();
    }
}


//Add a sample pop data
var index = 0;

function test_pop_db() {

    var heading = "TEST ENTRY HEADING" + index;
    var desc = "TEST DESC";
    var sdate = "2017-02-02";
    var stime = "12:00";
    var edate = "2017-02-03";
    var etime = "01:00";
    var tag = "#FFFFFF";

    try {
        db.transaction(function(t) {
            t.executeSql("INSERT INTO tododb (heading, desc, sdate, stime, edate, etime, tag) \
                      VALUES (?,?,?,?,?,?,?)", [heading, desc, sdate, stime, edate, etime, tag]);

            console.log("NEW TODO ENTRY");
            index += 1;
            getdata();
            displayTodo();
        })
    } catch (err) {
        console.log(err + " > DB TRANSACTION ERROR");
        //test_add_todo();
    }
}


//delete a entry
var todo_id = '';

function test_del_entry() {

    try {
        db.transaction(function(t) {
            t.executeSql("DELETE FROM tododb WHERE todoID=?", [todo_id]);

            console.log("DELETED TODO ENTRY");
            getdata();
            displayTodo();
        });
    } catch (err) {
        console.log(err + " > ERROR DELETING TODO");
    }
}
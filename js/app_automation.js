/*
Test automation
*/


//Global data
var curr_date = new Date();
//create current date 
function getcurrent_time(){
	return curr_date.getFullYear() + "-" +
    ('0' + (curr_date.getMonth() + 1)).slice(-2) + "-" +
    ('0' + curr_date.getDate()).slice(-2);
}


function test_auto(){

	//create_db:
	test_create_db();

	//populate the db:
	for (var i=0; i<=5; i++){
		test_pop_db(i);
	}

	//delete an entry
	test_del_entry();

	//display sample data db::
	test_show_db();

	//drop database
	//test_drop_db();


	//show failed and passsed tests


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


function test_pop_db(i) {

	var tag = ["#FFFFFF", "#36D7B7", "#F9BF3B", "#E26E67", "#83D6DE", "#5991B1"];

    var heading = "TEST ENTRY HEADING" + i;
    var desc = "TEST DESC";
    var sdate = getcurrent_time();
    var stime = "12:00";
    var edate = "";
    var etime = "01:00";

    try {
        db.transaction(function(t) {
            t.executeSql("INSERT INTO tododb (heading, desc, sdate, stime, edate, etime, tag) \
                      VALUES (?,?,?,?,?,?,?)", [heading, desc, sdate, stime, edate, etime, tag[i] ]);

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







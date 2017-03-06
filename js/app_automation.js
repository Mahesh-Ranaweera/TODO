//test automation set user parameters
var NUM_ITEMS = 5;
var NUM_ITEMS_DEL = 2;


//Global data
var curr_date = new Date();

var done;
//create current date 
function getcurrent_time(){
	return curr_date.getFullYear() + "-" +
    ('0' + (curr_date.getMonth() + 1)).slice(-2) + "-" +
    ('0' + curr_date.getDate()).slice(-2);
}


//automated test run onload
window.onload = function(){
    console.clear();
    auto_test_desc();
	test_cases();
}

function test_cases(){
    console.time("AUTO_TEST");

	//drop the db if exist for clean test::
	test_drop_db();

	//create_db::
	test_create_db();

	//test_populate db::
	for (var i=1; i<NUM_ITEMS+1; i++){
		test_pop_db(i);
	}

	//display sample data db::
	setTimeout(test_show_db(), 2000);

	//test_delete entry one by one::
	for (var j=1; j<NUM_ITEMS_DEL+1; j++){
		test_del_entry(j);
	}

    test_show_db();

    console.timeEnd("AUTO_TEST");
    //console.log("ENTER Ctrl+r to refresh page")
    return true;
}

function auto_test_desc(){
    console.log("%c TEST AUTOMATION ", "color: #16a085");
    console.log("%c FOLLOWING TESTS WILL BE CONDUCTED >", "color: #1abc9c");
    console.log("%c 1. DROP THE DATABASE", "color: #1abc9c");
    console.log("%c 2. CREATE THE DATABASE", "color: #1abc9c");
    console.log("%c 3. POPULATE THE APP WITH RANDOM TODO ITEMS {can set the number of items to generate}", "color: #1abc9c");
    console.log("%c 4. SHOW THE CURRENT ITEMS", "color: #1abc9c");
    console.log("%c 5. DELETE ENTRIES {can set the number of items to delete}", "color: #1abc9c");
    console.log("%c ============================================================================================", "color: #34495e");
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
    return true;
}


//populate the db with random todoitems
function test_pop_db(index) {
	//randomly select the todo card color
	var color_id = Math.floor((Math.random() * 5) + 0);

	var tag = ["#FFFFFF", "#36D7B7", "#F9BF3B", "#E26E67", "#83D6DE", "#5991B1"];

    var heading = "TEST ENTRY HEADING" + index;
    var desc = "TEST DESC";
    var sdate = getcurrent_time();
    var stime = "12:00";
    var edate = "";
    var etime = "01:00";

    try {
        db.transaction(function(t) {
            t.executeSql("INSERT INTO tododb (heading, desc, sdate, stime, edate, etime, tag) \
                      VALUES (?,?,?,?,?,?,?)", [heading, desc, sdate, stime, edate, etime, tag[color_id] ]);

            console.log(">> NEW TODO ENTRY");
            //getdata();
            //displayTodo();
        })
    } catch (err) {
        console.log(err + " > DB TRANSACTION ERROR");
    }
}


//get data from the db
function getdata() {
    if (db) {
        db.transaction(function(t) {
            t.executeSql("SELECT * FROM tododb", [], data)
        });
    }
}

function data(transaction, results) {
    if (results.rows.length == 0) {
        console.log("%c >> DATABASE EMPTY", "color: #c0392b");
    } else {
        console.log("%c >> DATABASE EXIST", "color: #2196F3");
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
            //getdata();
            //displayTodo();
        });
    }
}


//delete todo entries
function test_del_entry(index) {

    try {
        db.transaction(function(t) {
            t.executeSql("DELETE FROM tododb WHERE todoID=?", [index]);

            console.log("%c >> DELETED TODO ENTRY", "color: #c0392b");
        });
    } catch (err) {
        console.log(err + " > ERROR DELETING TODO");
    }
}

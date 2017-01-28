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
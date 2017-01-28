//connect the websql db
if (window.openDatabase) {
    var db = openDatabase("todo_db", "0.1", "todo_entry", 2 * 1024 * 1024);

    //start transactions
    db.transaction(function(t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS todo_db( \
                  todoID INTEGER PRIMARY KEY ASC, \
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

        t.executeSql("INSERT INTO todo_db (heading, desc, sdate, stime, edate, etime, allday, tag) \
                      VALUES ('test','test','test','test','test','test')");
    });
} else {
    alert("DB ERROR OCCURED");
    console.log("DB ERROR");
}
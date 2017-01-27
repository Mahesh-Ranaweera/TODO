function displayTodo() {
    //check status of db is available
    if (db) {
        //get info from the db
        db.transaction(function(t) {
            // display data from the db
            t.executeSql("SELECT * FROM todotb ", [], refreshTodo);
        });
    } else {
        alert("Something went wrong!");
    }
}
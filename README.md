## TODO
### Simple TODO app developed for Software Quality 3980U

---

![alt text][window]
[window]: https://github.com/Mahesh-Ranaweera/TODO/blob/master/screenshots/screenshot.png "TODO MAIN WINDOW"

![alt text][test]
[test]: https://github.com/Mahesh-Ranaweera/TODO/blob/master/screenshots/unittest.png "UNIT TESTING"

---

* Features:
  * allow to add color tags
  * web application : uses websql to store data
  * console application test implemented: to open console

  ```
  > Ctrl+Shift + I
  > to see predefined functions: apptest()

  AVAILABLE TESTS >
  1. SHOW DB:           test_show_db()
  2. CREATE_DB:         test_create_db()
  3. DROP_DB:           test_drop_db()
  4. POPULATE DB:       test_pop_db()
  5. CUSTOM DATA ENTRY: test_add_todo() {require to enter: heading = '', desc = '', sdate = 'YYYY-MM-DD', stime = 'HH:MM', edate = 'YYYY-MM-DD', etime = 'HH:MM', tag = '#000000' }
  6. DELETE ENTRY:      test_del_entry() {require to enter: todo_id = ''}
  ```

#### In order to run
```
> git clone "https://github.com/Mahesh-Ranaweera/TODO"
> cd TODO
> npm electron-prebuilt --save-dev
> npm start

--- To build

> npm build
```


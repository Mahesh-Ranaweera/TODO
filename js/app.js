//action
function exitBtn(id) {
    var exp_div = document.getElementById(id).style;
    var exp_bg  = document.getElementById('app-darkbg').style;
    if (exp_div.display == 'block') {
        exp_div.display = 'none';
        exp_bg.display = 'none';
    } else {
        exp_div.display = 'block';
        exp_bg.display = 'block';
    }
}
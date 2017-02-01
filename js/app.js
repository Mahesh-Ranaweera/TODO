//action
function exitBtn(id) {
    var exp_div = document.getElementById(id).style;
    var exp_bg = document.getElementById('app-darkbg').style;
    if (exp_div.display == 'block') {
        exp_div.display = 'none';
        exp_bg.display = 'none';
    } else {
        exp_div.display = 'block';
        exp_bg.display = 'block';
    }
}

//shortcut actions
//Ctrl+t ==> Open todo add 
window.onload = shortcuts();

function shortcuts() {
    var isCtrl = false;
    document.onkeyup = function(e) {
        if (e.this == 17) isCtrl = false;
    }
    document.onkeydown = function(e) {
        if (e.which == 17)
            isCtrl == true;
        if (e.which == 84 && isCtrl == true) {
            alert("You did it");
            return false;
        }
    }
}
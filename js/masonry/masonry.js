$(document).ready(function () {
    $('.app-content').masonry({
        itemSelector: '.todo-wrapper',
        columnWidth: '.todo-wrapper',
        percentPosition: true
    });
});
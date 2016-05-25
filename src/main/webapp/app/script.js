$(document).ready(function () {
    //auto hide alerts after 2 seconds.
    $('.alert').fadeTo(2000, 500).slideUp(500, function () {
        $('.alert').alert('close')
    })
});

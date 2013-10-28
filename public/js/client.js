var socket = io.connect();

socket.on('sent', function(words){
    var a = document.getElementById('chatter');
    a.innerHTML = a.innerHTML.replace(/<br>/g, '\n');
    a.textContent += words['username'] + ': ' + words['what'] + '\n';
    a.innerHTML = a.innerHTML.replace(/\n/g, '<br>');
    var objDiv = $('.chat-text');
    objDiv.scrollTop(objDiv.height());
});


$(document).ready(function(){
    $('.login-wrapper').show();
    $('.chat-container').hide();
});

function textEntered(e){
    e.preventDefault();
    socket.emit('entered', {what:$('#input').val()});
    $('#input').val("");
}

function usernameSubmit(e){
    e.preventDefault();
    socket.emit('setname', $('#username').val());
    console.log($('#username').val());
    $('.login-wrapper').hide();
    $('.chat-container').show();
}
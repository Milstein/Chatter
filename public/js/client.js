var socket = io.connect();

$(document).ready(function(){
    $('#chatBox').hide();
    $('#h1').hide();
    $('#p1').hide();
    $('#span').hide();
});

socket.on('sent', function(words){
    var a = document.getElementById('h1');
    a.innerHTML = a.innerHTML.replace(/<br>/g, '\n');
    a.textContent += words['username'] + ': ' + words['what'] + '\n';
    a.innerHTML = a.innerHTML.replace(/\n/g, '<br>');
});

function textEntered(e){
    e.preventDefault();
    socket.emit('entered', {what:$('#words').val()});
    $('#words').val("");
}

function usernameSubmit(e){
    e.preventDefault();
    socket.emit('setname', $('#username').val());
    $(document).ready(function(){
        $('#credentials').hide();
        $('#chatBox').show();
        $('#h1').show();
        $('#p1').show();
        $('#span').show();
    });
    
    console.log('usernameSubmit method run');
}
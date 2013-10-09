var socket = io.connect();

$(document).ready(function(){
    $('#test').hide();
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
    socket.emit('entered', {what:$('p').value});
    $('p1').textContent = 'This is what was entered: ' + $('p').value + '!';
    $('test').reset();
}

function usernameSubmit(e){
    e.preventDefault();
    socket.emit('setname', $('#use').val());
    console.log($('#use').val());
    
    $(document).ready(function(){
        $('#creds').hide();
    });
    $(document).ready(function(){
        $('#test').show();
        $('#h1').show();
        $('#p1').show();
        $('#span').show();
    });
    
    console.log('usernameSubmit method run');
}
var socket = io.connect();

socket.on('chat-received', function(words){
    
    var a = document.getElementById('chatter');
    a.innerHTML = a.innerHTML.replace(/<br>/g, '\n');
    a.textContent += words['username'] + ': ' + words['what'] + '\n';
    a.innerHTML = a.innerHTML.replace(/\n/g, '<br>');
    
    var objDiv = $('.chat-text');
    objDiv.scrollTop(objDiv.height());
});

socket.on('current-clients', function(clients){
    document.getElementById('clientel').innerHTML = '';
    
    for(var x = 0; x < clients.length; x++){
        console.log(clients.length + 'clients are ' + clients[x]);
        var b = document.getElementById('clientel');
        
        b.innerHTML = b.innerHTML.replace(/<br>/g, '\n');
        
        b.textContent += clients[x] + '\n';
        
        b.innerHTML = b.innerHTML.replace(/\n/g, '<br>');
    }
    console.log('current client event received');
});


$(document).ready(function(){
    $('.login-wrapper').show();
    $('.chat-container').hide();
});

function textEntered(e){
    e.preventDefault();
    socket.emit('chat-sent', {what:$('#input').val()});
    $('#input').val("");
}

function usernameSubmit(e){
    e.preventDefault();
    socket.emit('setname', $('#username').val());
    console.log($('#username').val());
    $('.login-wrapper').hide();
    $('.chat-container').show();
}
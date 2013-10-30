var socket = io.connect();
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60',  '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d']
socket.on('chat-received', function(words){
    
    var a = document.getElementById('chatter');
    a.innerHTML = a.innerHTML.replace(/<br>/g, '\n');
    a.textContent += words['username'] + ': ' + words['what'] + '\n';
    a.innerHTML = a.innerHTML.replace(/\n/g, '<br>');
    
    var objDiv = $('.chat-text');
    objDiv.scrollTop(objDiv[0].scrollHeight);
    
    
    $('.clients').css('background-color', colors[(Math.floor(Math.random()*colors.length))]);
    $('.chat').css('background-color', colors[(Math.floor(Math.random()*colors.length))]);
    $('.chat-input').css('background-color', colors[(Math.floor(Math.random()*colors.length))]);
    
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
    $('.page').show();
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
    $('.page').hide();
    $('.chat-container').show();
}
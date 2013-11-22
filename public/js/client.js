var socket = io.connect();

last = '';
socket.on('chat-received', function(words){
    if(last != words.username){

        var name = $('<span>');
            name.addClass('username-text');
            name.text(words.username + '  '); 
        var text = $('<span>');
            text.text(words.what + '\n'); 
        var div = $('<div>');
            div.append(name);
            div.append(text);
            div.appendTo('.chat-text');
            last = words.username;
    }
    else{
        var text = $('<div>');
            text.addClass('second-chat');
            text.text(words.what + '\n'); 
            text.appendTo('.chat-text');
    }
    
    var objDiv = $('.chat-text');
    objDiv.scrollTop(objDiv[0].scrollHeight); 
    
});


$('.chat-text')[0].addEventListener('drop', handleDrop);


$('.chat-text').on(
    'dragover',
    function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
);
$('.chat-text').on(
    'dragenter',
    function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
);

function handleDrop(e) {
  e.stopPropagation(); // Stops some browsers from redirecting.
  e.preventDefault();
  var files = e.dataTransfer.files;
  for (var i = 0, f; f = files[i]; i++) {
      var fileReader = new FileReader();

		fileReader.onload = function(fileLoadedEvent) 
		{
            /*var img = new Image();
            var ctx = canvas.getContext("2d");
            var canvasCopy = document.createElement("canvas");
            var copyContext = canvasCopy.getContext("2d");
            
            img.onload = function()
            {
                var ratio = 1;
                
                if(img.width > maxWidth)
                ratio = maxWidth / img.width;
                else if(img.height > maxHeight)
                ratio = maxHeight / img.height;
                
                canvasCopy.width = img.width;
                canvasCopy.height = img.height;
                copyContext.drawImage(img, 0, 0);
                
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
            };
            
            img.src = fileLoadedEvent.target.result;*/
            var encodedFile = fileLoadedEvent.target.result;
            socket.emit('picture-sent', encodedFile);
		};

      fileReader.readAsDataURL(f);
  }
}

socket.on('current-clients', function(clients){
    $('.clients-text').empty();
    for(var x = 0; x < clients.length; x++){
        var div = $('<div>');
            div.addClass('individual-client');
            div.attr('title', clients[x]);
            div.text(clients[x] + '\n');
            div.appendTo('.clients-text');
    }
});

socket.on('picture-received', function(base64String){
    picture = $('<img>');
    picture.attr('src', base64String);
    picture.appendTo('.chat-text');
});
$(document).ready(function(){
    $('.chat-container').hide();
});

function validateChat(chat){
    if(chat.length > 200){
        return false;
    }
    return true;
}

$('.input-form').on('submit', function(e){
    e.preventDefault();
    var chat = $('#input').val();
    if(chat.length ==0) return;
    if(validateChat(chat)){
        socket.emit('chat-sent', {what:chat});
        $('#input').val("");
    }
    else{
    var name = $('<span>');
        name.addClass('chatter-text');
        name.text('All messages must be under 200 characters' + '\n'); 
    var div = $('<div>');
        div.append(name);
        div.appendTo('.chat-text');
    }
});

function isSpaces(chat){
    var counter = 0;
    for(var x = 0; x< chat.length; x++){
        if(chat[x] === ' ')
            counter++;
    }
    if(counter == chat.length)
        return true;
    return false;
}

$('.username-submit').on('submit', function(e){
    e.preventDefault();
    var username = $('#username').val();
    if(username.length ==0) return;
    if(username.length < 15){
        if(!(isSpaces(username))){
            socket.emit('setname', username);
            $('.page').hide();
            $('.chat-container').show();
        }
        else{
            alert('Please select a username');
            $('#username').val('');
        }
    }
    else{
        alert('Username must be less than 15 characters');
    }
        
});
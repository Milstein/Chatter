var socket = io.connect();

socket.on('sent', function(words){
    var a = document.getElementById('chatter');
    a.innerHTML = a.innerHTML.replace(/<br>/g, '\n');
    a.textContent += words['username'] + ': ' + words['what'] + '\n';
    a.innerHTML = a.innerHTML.replace(/\n/g, '<br>');
});

function textEntered(e){
    e.preventDefault();
    socket.emit('entered', {what:$('#input').val()});
    $('#input').val("");
}

function usernameSubmit(){
    socket.emit('setname', $('#username').val());
    console.log($('#username').val());
    /*$.ajax({
        url: "localhost/chat",
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        }
    })
    .done(function( data ) {
        if ( console && console.log ) {
            console.log( "Sample of data:", data.slice( 0, 100 ) );
        }
    });*/
}
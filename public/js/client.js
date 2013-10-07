var socket = io.connect();

function textEntered(e){
    e.preventDefault();
    socket.emit('entered', {what:document.getElementById('p').value});
    document.getElementById('p1').textContent = 'This is what was entered: ' + document.getElementById('p').value + '!';
    document.getElementById('test').reset();
}
socket.on('sent', function(words){
    var a = document.getElementById('h1');
    a.innerHTML = a.innerHTML.replace(/<br>/g, '\n');
    a.textContent += words['what'] + '\n';
    a.innerHTML = a.innerHTML.replace(/\n/g, '<br>');
});
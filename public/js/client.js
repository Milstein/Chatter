var socket = io.connect();

function textEntered(e){
    console.log(e);
    e.preventDefault();
    socket.emit('entered', {what:document.getElementById('p').value});
    document.getElementById('p1').textContent = 'This is what was entered: ' + document.getElementById('p').value + '!';
    document.getElementById('test').reset();
}
socket.on('sent', function(words){
    var a = document.getElementById('h1');
    console.log(words);
    a.innerHTML = a.innerHTML.replace(/<br>/g, '\n');
    a.textContent += words['what'] + '\n';
    a.innerHTML = a.innerHTML.replace(/\n/g, '<br>');
    
    //document.getElementById('h1').innerHTML += '<br>';
   // document.getElementById('h1').textContent +=  words['what'];
});
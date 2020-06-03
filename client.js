const socket=io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById("messageInp");
const messagecontainer=document.querySelector(".container");


const append=(message,position)=>{
    console.log("append is runnning");
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('messsage');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(message,'right');
    socket.emit('send',message);
    messageInput.value='';

})
const name= prompt("enter your name to join");

socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
        append(name+" : has joined the chat",'right');
})
socket.on('receive',data=>{
    append(data.name+":"+data.message,'left')
})
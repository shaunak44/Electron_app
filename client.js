const { Socket } = require("dgram");
const { app } = require("electron");


const socket = require('socket.io-client')('http://localhost:3010');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messgageContainer = document.querySelector(".container")
var audio = new Audio('sound.mp3');

const append_joined = (message, position) =>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    if(position == "right"){
        messageElement.setAttribute('class', "message right");
    }
    else if(position == "left"){
        messageElement.setAttribute('class', "message left");
    }
    else if(position == "center"){
        messageElement.setAttribute('class', "message center");
    }
    messgageContainer.append(messageElement);
    if(position !== 'right'){
        audio.play();
    }
}


const send_button = document.getElementById('send_button')
send_button.addEventListener('click',function send(e){
    e.preventDefault();
    const message = document.querySelector('#messageInp').value;
    append_joined(`You: ${message}`, `right`);
    socket.emit('send', message);
    document.querySelector('#messageInp').value = "";
})
var name = "bot";
const username_button = document.getElementById('username_button');
username_button.addEventListener('click', function send(e){
    e.preventDefault();
    const message = document.querySelector('#user_message').value;
    name = message;
    //console.log(name);
    socket.emit('new-user-joined', name);
})


socket.on('user-joined', name =>{
    append_joined(`${name} joined the chat`, 'center');
})

socket.on('receive', data =>{
    append_joined(`${data.name}:${data.message}`, 'left');
})

socket.on('left', name=>{
    append_joined(`${name} left the chat`, 'left');
})



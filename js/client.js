const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");

const messageInput = document.getElementById("messageInp");

const messageContainer = document.querySelector(".container");

var audio = new Audio("tang.ogg");

//function which will append to the container

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position) {
    audio.play();
  }
};
// ASK NEW USER FOR HIS HER NAME and let the server know
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);
// IF THE NEW USER JOINS ,receive his name from the server
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});
//if server sends massage , receive it
socket.on("receive", (data) => {
  append(`${data.name}:${data.message}`, "left");
});

// if user leave the chat append the info to the container
socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
// if the foprm get submitted,send server the message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

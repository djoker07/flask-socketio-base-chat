const socket = io.connect("http://" + document.domain + ":" + location.port);
const form = document.getElementById("mForm");
const chat = document.getElementById("chat");
const msg = document.getElementById("msg");
const user = prompt("enter username");

socket.on("connect", function () {
  socket.emit("join", {
    username: user,
  });  
});

socket.on("joined room", function (msg) {
  console.log(msg);
});

socket.on("left room", function (msg) {
  console.log(msg);
});

// form event submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let user_name = user;
  let user_input = msg.value;
  // sending the message to server
  socket.emit("message", {
    user_name: user_name,
    message: user_input,
  });

  msg.value = "";
});


// receiving socket response from server and adding message to screen
socket.on('response', msg => {
  console.log(msg);
  if (typeof msg.user_name !== "undefined") {
    // create message entry
    let entry = document.createElement("div");
    if (msg.user_name === user) {
      entry.classList.add("entry");
    } else {
      entry.classList.add("guest");
    }
    entry.innerHTML = `<div> <b> ${msg.user_name} </b> ${msg.message} </div>`;
    chat.appendChild(entry);
  }
})

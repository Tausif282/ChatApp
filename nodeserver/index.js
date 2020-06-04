//Node server which will handle socket io connections

const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  // if any new user joins let  other user connected to the server know
  socket.on("new-user-joined", (name) => {
    // console.log("New user", name);

    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  // if some one send massage braod casrt to the other people
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
  // if someone left the chat ,let other know
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

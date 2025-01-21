const io = require("socket.io")(httpServer);

let document = []; // Array of Char objects

io.on("connection", (socket) => {
  const clientId = socket.id;
  socket.emit("initialState", document);

  socket.on("insert", ({ char, position }) => {
    console.log(`Received insert from ${clientId}:`, char, position);
    document.splice(position, 0, char); // Insert at the specified position
    io.emit("remoteInsert", { char, position });
  });

  socket.on("delete", (charId) => {
    console.log(`Received delete for ${charId} from ${clientId}`);
    const charToMark = document.find(
      (c) =>
        c.id.clientId === charId.clientId && c.id.counter === charId.counter
    );
    if (charToMark && !charToMark.deleted) {
      charToMark.deleted = true;
      io.emit("remoteDelete", charId);
    }
  });
});

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function TextEditorCRDT() {
  const [chars, setChars] = useState([]);
  const clientId = useRef(null);

  useEffect(() => {
    clientId.current = socket.id; // Assign client ID

    socket.on("initialState", (initialState) => {
      setChars(initialState);
    });

    socket.on("remoteInsert", ({ char, position }) => {
      setChars((prevChars) => {
        const newChars = [...prevChars];
        newChars.splice(position, 0, char);
        return newChars;
      });
    });

    socket.on("remoteDelete", (charId) => {
      setChars((prevChars) =>
        prevChars.map((char) =>
          char.id.clientId === charId.clientId &&
          char.id.counter === charId.counter
            ? { ...char, deleted: true }
            : char
        )
      );
    });

    return () => {
      socket.off("initialState");
      socket.off("remoteInsert");
      socket.off("remoteDelete");
    };
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    const oldText = chars
      .filter((c) => !c.deleted)
      .map((c) => c.value)
      .join("");

    // Identify insertions (simplified - needs refinement for complex edits)
    for (let i = 0; i < newText.length; i++) {
      if (oldText[i] !== newText[i]) {
        const insertedChar = newText[i];
        const id = generateUniqueId(clientId.current);
        const charObj = new Char(id, insertedChar);

        // Determine insertion position (simplified - needs refinement)
        const position = i; // This is a very basic positioning

        socket.emit("insert", { char: charObj, position });
        break; // Handle one insertion at a time for simplicity
      }
    }

    // Identify deletions (simplified)
    if (newText.length < oldText.length) {
      // Assuming a single character deletion
      const deletedChar = oldText[e.target.selectionStart];
      if (deletedChar) {
        const charToDelete = chars.find(
          (c) => c.value === deletedChar && !c.deleted
        ); // Basic match
        if (charToDelete) {
          socket.emit("delete", charToDelete.id);
        }
      }
    }
  };

  const renderedText = chars
    .filter((char) => !char.deleted)
    .map((char) => char.value)
    .join("");

  return <textarea value={renderedText} onChange={handleTextChange} />;
}

export default TextEditorCRDT;

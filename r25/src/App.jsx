import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableList from "./DraggableList";

const initialItems = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
];

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <DraggableList initialItems={initialItems} />
      </div>
    </DndProvider>
  );
}

export default App;

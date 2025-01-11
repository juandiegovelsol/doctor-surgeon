import React, { useState, useCallback } from "react";
import DraggableItem from "./DraggableItem";

const DraggableList = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);

  console.log("DraggableList: Rendered with items:", items); // Log items array on render

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      console.log(
        `DraggableList (moveItem): Moving item from index ${dragIndex} to ${hoverIndex}`
      ); // Log moveItem call
      setItems((prevItems) => {
        const newItems = [...prevItems];
        const draggedItem = newItems[dragIndex];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        console.log(
          "DraggableList (moveItem - setItems): New items state:",
          newItems
        ); // Log new items state
        return newItems;
      });
    },
    [setItems]
  );

  return (
    <div>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          text={item.text}
          index={index}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};

export default DraggableList;

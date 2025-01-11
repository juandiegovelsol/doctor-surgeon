import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ id, text, index, moveItem }) => {
  const ref = useRef(null);

  console.log(
    `DraggableItem: Rendered with index ${index}, id ${id}, text ${text}`
  ); // Log on each render

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: () => {
      console.log(
        `DraggableItem (useDrag): Start drag for index ${index}, id ${id}`
      ); // Log when drag starts
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "ITEM",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      console.log(
        `DraggableItem (useDrop - hover): Hovering over index ${hoverIndex}, dragged item index ${dragIndex}, id ${id}, dragged item id ${item.id}`
      ); // Log on hover

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity,
        cursor: "move",
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "5px",
        backgroundColor: "white",
      }}
    >
      {text}
      {/* <p>Index: {index}</p>  Optional: Display index for debugging visually */}
    </div>
  );
};

export default DraggableItem;

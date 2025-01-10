import React, { useState, useRef } from "react";
import "./JigsawPuzzle.css"; // Import CSS file

const JigsawPuzzle = () => {
  const [imageURL, setImageURL] = useState(null);
  const [gridSize, setGridSize] = useState(5);
  const [pieces, setPieces] = useState([]);
  const [message, setMessage] = useState("");
  const puzzleSize = 500;
  const pieceSize = puzzleSize / gridSize;
  const puzzleContainerRef = useRef(null);
  const initialDifficulty = "5";

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageURL(e.target.result);
        generatePuzzle(parseInt(initialDifficulty));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDifficultyChange = (event) => {
    const newGridSize = parseInt(event.target.value);
    setGridSize(newGridSize);
    generatePuzzle(newGridSize);
  };

  const generatePuzzle = (currentGridSize) => {
    if (!imageURL) return;

    const newPieceSize = puzzleSize / currentGridSize;
    const backgroundPositions = [];
    for (let row = 0; row < currentGridSize; row++) {
      for (let col = 0; col < currentGridSize; col++) {
        backgroundPositions.push(
          `-${col * newPieceSize}px -${row * newPieceSize}px`
        );
      }
    }

    let shuffledPositions = [...backgroundPositions].sort(
      () => Math.random() - 0.5
    );
    const initialPieces = [];

    for (let i = 0; i < currentGridSize * currentGridSize; i++) {
      initialPieces.push({
        id: `piece-${i}`,
        originalPosition: backgroundPositions[i],
        currentPosition: shuffledPositions[i],
        isDragging: false,
      });
    }
    setPieces(initialPieces);
    setMessage("");
  };

  const handleDragStart = (event, index) => {
    const updatedPieces = pieces.map((piece, i) =>
      i === index ? { ...piece, isDragging: true } : piece
    );
    setPieces(updatedPieces);
    event.dataTransfer.setData("pieceIndex", index.toString());
  };

  const handleDragEnd = (index) => {
    const updatedPieces = pieces.map((piece, i) =>
      i === index ? { ...piece, isDragging: false } : piece
    );
    setPieces(updatedPieces);
    checkWinCondition();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    const pieceIndex = event.dataTransfer.getData("pieceIndex");
    if (pieceIndex !== null && pieceIndex !== undefined) {
      const pieceIndexNum = parseInt(pieceIndex, 10);

      if (pieceIndexNum !== targetIndex) {
        const updatedPieces = [...pieces];
        const tempPos = updatedPieces[pieceIndexNum].currentPosition;
        updatedPieces[pieceIndexNum].currentPosition =
          updatedPieces[targetIndex].currentPosition;
        updatedPieces[targetIndex].currentPosition = tempPos;
        setPieces(updatedPieces);
      }
    }
  };

  const checkWinCondition = () => {
    let solved = true;
    for (let i = 0; i < pieces.length; i++) {
      let currentPos = pieces[i].currentPosition;
      let originalPos = pieces[i].originalPosition;

      const normalizePosition = (pos) => {
        let parts = pos.split(" ");
        let x = parts[0];
        let y = parts[1];

        if (x === "-0px") x = "0px";
        if (y === "-0px") y = "0px";

        return `${x} ${y}`;
      };

      currentPos = normalizePosition(currentPos);
      originalPos = normalizePosition(originalPos);

      if (currentPos !== originalPos) {
        solved = false;
        break;
      }
    }

    if (solved) {
      setMessage("Congratulations! Puzzle Solved!");
    }
  };

  return (
    <div>
      <div id="difficulty-container" className="difficulty-container">
        <label className="difficulty-radio">
          <input
            type="radio"
            name="difficulty"
            value="5"
            checked={gridSize === 5}
            onChange={handleDifficultyChange}
          />
          Easy (5x5)
        </label>
        <label className="difficulty-radio">
          <input
            type="radio"
            name="difficulty"
            value="7"
            checked={gridSize === 7}
            onChange={handleDifficultyChange}
          />
          Medium (7x7)
        </label>
        <label className="difficulty-radio">
          <input
            type="radio"
            name="difficulty"
            value="10"
            checked={gridSize === 10}
            onChange={handleDifficultyChange}
          />
          Hard (10x10)
        </label>
        <label className="difficulty-radio">
          <input
            type="radio"
            name="difficulty"
            value="15"
            checked={gridSize === 15}
            onChange={handleDifficultyChange}
          />
          Expert (15x15)
        </label>
      </div>
      <div id="upload-container" className="upload-container">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div
        id="puzzle-container"
        ref={puzzleContainerRef}
        className="puzzle-container"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
        onDragOver={handleDragOver}
      >
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            className={`puzzle-piece ${piece.isDragging ? "dragging" : ""}`}
            style={{
              ...(piece.isDragging ? { cursor: "grabbing", zIndex: "10" } : {}),
              backgroundImage: imageURL ? `url('${imageURL}')` : "none",
              backgroundSize: `${puzzleSize}px ${puzzleSize}px`,
              backgroundPosition: piece.currentPosition,
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={() => handleDragEnd(index)}
            onDrop={(e) => handleDrop(e, index)}
          />
        ))}
      </div>
      <div id="message" className="message">
        {message}
      </div>
    </div>
  );
};

export default JigsawPuzzle;

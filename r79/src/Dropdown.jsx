import React, { useState } from "react";

function Dropdown({ options, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        aria-label={label || "Open dropdown"}
      >
        {/* Display selected value or default text */}
        Open Dropdown
      </button>
      {isOpen && (
        <ul role="listbox">
          {options.map((option) => (
            <li key={option} role="option" onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

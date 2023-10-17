import React, { useState } from "react";
import "./HSelect.css";

function HSelect({ placeholder, options }) {
  const [showDropDown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const onClickHandler = option => {
    return () => {
      setShowDropdown(false);
      setSelectedOption(option);
    };
  };
  return (
    <div className="select">
      <button
        className="select__label"
        onClick={() => setShowDropdown(!showDropDown)}
      >
        {(selectedOption && selectedOption.label) || placeholder}
      </button>
      {showDropDown && (
        <ul className="select__options">
          <li>
            <button onClick={onClickHandler(null)}>{placeholder}</button>
          </li>
          {options.map(option => (
            <li>
              <button onClick={onClickHandler(option)}>{option.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HSelect;
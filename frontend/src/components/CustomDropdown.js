import React, { useState, useRef } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef} onBlur={handleBlur}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <img src="/sort.png" alt="Sort" />
        <span>{selectedOption}</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className={`dropdown-item`}
              onMouseDown={() => handleSelectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

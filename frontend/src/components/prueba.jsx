import React, { useEffect, useState } from "react";

const SelectableForm = ({ onOptionsChange,  showError=false}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const stacks = [
    {
      id: "1A23C",
      name: "React",
      color: "#4C8DFF",
    },
    {
      id: "9A2E7",
      name: "Spring",
      color: "#6CB23E",
    },
  ];
  const [options] = useState(["React", "Angular", "Spring boot", "Laravel"]);

  useEffect(() => {
    onOptionsChange(selectedOptions)
  }, [selectedOptions, onOptionsChange]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && !selectedOptions.includes(selectedValue)) {
      setSelectedOptions([...selectedOptions, selectedValue]);
    }
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
  };

  const availableOptions = options.filter(
    (option) => !selectedOptions.includes(option)
  );

  return (
    <div className="mt-4 flex flex-col">
      <label
        htmlFor="stacks"
        className="font-semibold font-body text-primary-color"
      >
        Stacks
      </label>
      <select className="h-10 bg-trasparent border border-highlight-color text-gray-300 text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 " onChange={handleSelectChange} defaultValue="">
        <option value="" className="hidden">Seleccione una opción</option>
        {availableOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div>
        {selectedOptions.map((option) => (
          <button className="text-highlight-color" key={option} onClick={() => handleRemoveOption(option)}>
              {option} &times;
          </button>
        ))}
      </div>
      {showError ? (
            <span className="text-highlight-color text-xs font-semibold">
              Debe seleccionar stacks
            </span>
          ) : null}
    </div>
  );
};

export default SelectableForm;

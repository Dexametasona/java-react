import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetStack } from "../redux/stacks/stacksActions";

const SelectableForm = ({ onOptionsChange, showError = false }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { stacks } = useSelector((store) => store.stacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetStack());
  }, [dispatch]);

  useEffect(() => {
    onOptionsChange(selectedOptions);
  }, [selectedOptions, onOptionsChange]);

  // const handleSelectChange = (event) => {
  //   const selectedValue = event.target.value;
  //   const selectedOption = stacks.find(stack => stack.name === selectedValue);
  //   if (selectedOption && !selectedOptions.some(opt => opt.name === selectedOption.name)) {
  //     setSelectedOptions([...selectedOptions, selectedOption]);
  //   }
  // };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && !selectedOptions.includes(parseInt(selectedValue))) {
      setSelectedOptions([...selectedOptions, parseInt(selectedValue)]);
    }
  };

  const handleRemoveOption = (id) => {
    setSelectedOptions(selectedOptions.filter((optId) => optId !== id));
  };

  // const handleRemoveOption = (option) => {
  //   setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
  // };

  const availableOptions = stacks.filter(
    (stack) => !selectedOptions.includes(stack.name)
  );

  return (
    <div className="my-2 flex flex-col">
      <label
        htmlFor="stacks"
        className="font-semibold font-body text-primary-color"
      >
        Stacks
      </label>
      <select
        className="h-10 bg-trasparent border border-highlight-color text-gray-300 text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2 "
        onChange={handleSelectChange}
        defaultValue=""
      >
        <option value="" className="hidden">
          Seleccione una opción
        </option>
        {availableOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div>
        {selectedOptions.map((id) => {
          const option = stacks.find((stack) => stack.id === id);
          return (
            <button
              className="text-highlight-color"
              key={id}
              onClick={() => handleRemoveOption(id)}
            >
              {option.name} &times;
            </button>
          );
        })}
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

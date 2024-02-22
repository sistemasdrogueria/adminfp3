import React, { useState } from 'react';
import { options } from "../data/types";


const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };


  return (
    <div className="mb-4">
      <label className='text-slate-800 ' htmlFor="options">Selecciona un tipo de usuario:</label>
      <select className='mt-2 w-full  p-3 bg-gray-50' id="options" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Seleccionar...</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.nombre}</option>
        ))}
      </select>
      <p>Tipo de usuario seleccionado: {selectedOption}</p>
    </div>
  );
};

export default SelectComponent;
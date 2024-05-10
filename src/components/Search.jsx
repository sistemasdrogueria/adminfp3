import React from 'react'
import { useState } from 'react';
export default function Search({ onSearch,title }) {

    

   const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

    const handleSearch = (e) => {
    e.preventDefault();
    // Aquí podrías realizar la lógica para enviar los datos de búsqueda al servidor
    onSearch({ searchTerm, startDate, endDate });
  };
  return (
        <div>
        <div className='rounded border'> 
         <h1 className="text-3xl font-black text-center">{title} </h1>
   <form onSubmit={handleSearch} className="p-4 bg-gray-100 rounded-md">
      <div className=" flex flex-col  justify-around gap-2 mt-5 md:flex-row  lg:flex-row ">
        <div>
          <label htmlFor="searchTerm" className="block mb-1">Buscar por Cliente, Número de Pedido</label>
          <input
            type="text"
            id="searchTerm"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Ingrese término de búsqueda"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block mb-1">Fecha de Inicio</label>
          <input
            type="date"
            id="startDate"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-1 font-">Fecha de Fin</label>
          <input
            type="date"
            id="endDate"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
         <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Buscar</button>
      </div>
     
    </form>

        </div>
        </div>
  )
}

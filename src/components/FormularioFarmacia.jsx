import React, { useState } from 'react'


export default function FormularioFarmacia() {
      const [formData, setFormData] = useState({
    email: '',
    name: '',
    altEmail: '',
    address: '',
    website: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Aquí puedes agregar lógica para enviar datos a un servidor o API.
  };
  return (
    <div>
        <form onSubmit={handleSubmit} className="w-full mx-auto bg-gray-200 p-8 shadow-md rounded-lg">
      <div className="mb-4 ">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="altEmail" className="block text-gray-700 text-sm font-bold mb-2">Email Alternativo:</label>
        <input type="email" name="altEmail" id="altEmail" value={formData.altEmail} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Domicilio:</label>
        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">Página Web:</label>
        <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Guardar
        </button>
      </div>
    </form>
      
    </div>
  )
}

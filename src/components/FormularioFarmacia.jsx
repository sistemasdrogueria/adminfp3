import React, { useState,useEffect } from 'react'
import Alerta from './Alerta';
import { toast } from "react-toastify";
import clienteAxios from '../config/axios';

export default function FormularioFarmacia({pharmacies}) {
    const [errores,setErrores]= useState([]);
    const [isLoading, setIsLoading] = useState(false); 
      const [formData, setFormData] = useState({
    email: '',
    name: '',
    email_alternative: '',
    addresses: '',
    web_page: '',
    name_pharmacies:'',
    cellphone:'',
    code_ds:'',
  });

  useEffect(() => {
    // Verifica si pharmacies tiene datos y asigna el primer elemento a formData
    if (pharmacies && pharmacies.length > 0) {
      const firstPharmacy = pharmacies[0]; // Aquí puedes seleccionar la farmacia que desees
      setFormData({
        email: firstPharmacy.email,
        name: firstPharmacy.name,
        email_alternative: firstPharmacy.email_alternative,
        addresses: firstPharmacy.addresses,
        web_page: firstPharmacy.web_page,
        code_ds: firstPharmacy.code_ds,
        name_pharmacies: firstPharmacy.name_pharmacies,
        cellphone: firstPharmacy.cellphone
      });
    }
  }, [pharmacies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setIsLoading(true);
   const token = localStorage.getItem("AUTH_TOKEN");

  try {
       const respuesta = await clienteAxios.put(`/api/updateFarmaciasAdmin/${ pharmacies[0].id}`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      toast.success('Registro Modificado');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
      // Si hay errores de validación en la respuesta del servidor, mostrarlos
      const errores = Object.values(error.response.data.errors);
      setErrores(errores);
    } else {
      // Si ocurre otro tipo de error, mostrar un mensaje genérico
      toast.error('Se produjo un error al procesar la solicitud.');
    }
  
    } finally {
            setIsLoading(false); // Establecer isLoading a false al finalizar la solicitud
        }
    // Aquí puedes agregar lógica para enviar datos a un servidor o API.
  };
  return (
    <div>
        <form onSubmit={handleSubmit} className="w-full mx-auto bg-gray-200 p-8 shadow-md rounded-lg">
            {errores? errores.map((error,i) => <Alerta key={i}> {error}</Alerta>) : null}
      <div className="mb-4 ">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="email_alternative" className="block text-gray-700 text-sm font-bold mb-2">Email Alternativo:</label>
        <input type="email" name="email_alternative" id="email_alternative" value={formData.email_alternative} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="addresses" className="block text-gray-700 text-sm font-bold mb-2">Domicilio:</label>
        <input type="text" name="addresses" id="addresses" value={formData.addresses} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="web_page" className="block text-gray-700 text-sm font-bold mb-2">Página Web:</label>
        <input type="text" name="web_page" id="web_page" value={formData.web_page} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="text-center mb-3">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
      
    </div>
  )
}

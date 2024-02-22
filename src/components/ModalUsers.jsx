
import {createRef,useState} from "react";
import clienteAxios from "../config/axios";
import useAdmin from "../hooks/useAdmin";
import Alerta from "./Alerta";
import { toast } from "react-toastify";
import SelectComponent from "./Select";
import { options } from "../data/types";



export default function ModalUsers() {  
  const { usersEdit, handleClickModal, handleSetUser, } = useAdmin();
  const {id,name, lastname, email, type_id,cellphone,addresses,active,birthday,password } = usersEdit;
 const fecha = new Date(birthday);
const formattedDate = fecha.toISOString().split('T')[0];
  const [errores,setErrores]= useState([]);
   const [formData, setFormData] = useState({
    id,
    name,
    lastname, 
    email,
    cellphone,
    addresses,
    active,
    birthday:formattedDate,
    password,
    type_id,
    password_confirmation:password
    
  });
  



  const handleInputChange =  (e) => {
 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };





  const handleSubmitUsers =  async (e)=> {
       e.preventDefault();
 try {
  
  const  respuesta = await clienteAxios.put(`/api/updateUsersAdmin/${id}`, formData)
   handleSetUser(formData);
   toast.success('Registro Modificado');
      handleClickModal();
 } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Si hay errores de validación en la respuesta del servidor, mostrarlos
      const errores = Object.values(error.response.data.errors);
      setErrores(errores);
    } else {
      // Si ocurre otro tipo de error, mostrar un mensaje genérico
      toast.error('Se produjo un error al procesar la solicitud.');
    }
  
 }

  }


  return (
<div className="md:flex gap-10">
  <div className="md:w-full">
    <div className="flex justify-end">
      <button onClick={handleClickModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
    
    <div className="bg-gray-100 w-full shadow-md rounded-md  px-2 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center"> Modificar el registro del usuario: <span style={{ textTransform: 'capitalize' }}>{usersEdit.name}</span> </h1>
      <form 
      onSubmit={handleSubmitUsers} noValidate>
         {errores? errores.map((error,i) => <Alerta key={i}> {error}</Alerta>) : null}
        <div className="md:flex">
          <div className="md:w-2/3 px-5 py shadow ">
            <div className="mb-4">
              <label className="text-slate-800 " htmlFor="name">
                Nombre:{" "}
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre"
              />
            </div>
            <div className="mb-4">
              <label className="text-slate-800 " htmlFor="lastname">
                Apellido:{" "}
              </label>
              <input
                type="text"
                id="lastname"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder=""
                 
              />
            </div>
            <div className="mb-4">
              <label className="text-slate-800 " htmlFor="email">
                Email:{" "}
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu email"

              />
            </div>
            
<div className="mb-4">
              <label className="text-slate-800 " htmlFor="celular">
                Celular:{" "}
              </label>
              <input
                type="celular"
                id="cellphone"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="cellphone"
                value={formData.cellphone}
                onChange={handleInputChange}
                placeholder="Tu celular"
        
              />
            </div>

                <div className="mb-4">
      <label className='text-slate-800 ' htmlFor="options">Selecciona un tipo de usuario:</label>
      <select className='mt-2 w-full  p-3 bg-gray-50' id="options" name="type_id" value={formData.type_id} onChange={handleInputChange}>
        <option value="">Seleccionar...</option>
        {options.map(option => (
          
      <option key={option.id} value={option.id}>{option.nombre}</option>
  ))}
      </select>
     
    </div>

          </div>
          <div className="md:w-2/3 px-5 py  shadow">
             <div className="mb-4">
              <label className="text-slate-800 " htmlFor="addresses">
                Dirección:
              </label>
              <input
                type="text"
                id="addresses"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="addresses"
                value={formData.addresses}
                onChange={handleInputChange}
                placeholder="Tu dirección"

              />
            </div>
            
        
            <div className="mb-4">
              <label className="text-slate-800 " htmlFor="nacimiento">
                Fecha Nacimiento:{" "}
              </label>
              <input
                type="date"
                id="birthday"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                placeholder=""

              />
            </div>
            <div className="mb-4">
              <label className="text-slate-800 " htmlFor="password">
                Password:{" "}
              </label>
              <input
                type="password"
                id="password"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Tu password"

              />
            </div>
            <div className="mb-4">
              <label className="text-slate-800 " htmlFor="password_confirmation">
                Repetir Password:{" "}
              </label>
              <input
                type="password"
                id="password_confirmation"
                className="mt-2 w-full  p-3 bg-gray-50"
                name="password_confirmation"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Repetir password"

              />
            </div>
            
            
            </div> 
        </div>
        <div className="text-center">
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800
             text-white  w-60 mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Modificar Registro"
        />
        </div>
      </form>
    </div>
  </div>
</div>
  );
}

import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import clienteAxios from "../config/axios";
import Alerta from "./Alerta";
import { toast } from "react-toastify";

export default function ModalFarmacias() {

  const { farmaciasEdit, handleClickModalFarmacias,handleSetFarmacias} = useAdmin();
  const [errores,setErrores]= useState([]);
  const {
    id,
    name,
    name_pharmacies,
    cellphone,
    code_ds,
    email,
    addresses,
    active,
    clientes_id_ds
    
  } = farmaciasEdit;
  const [formData, setFormData] = useState({
    id,
    name,
    name_pharmacies,
    cellphone,
    code_ds,
    email,
    addresses,
    active,
    clientes_id_ds
    
  });


  const handleInputChange =  (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitFarmacias = async (e) => {
    e.preventDefault();

  
    try {
       const respuesta = await clienteAxios.put(`/api/updateFarmaciasAdmin/${id}`, formData)
         
      handleSetFarmacias(formData);
      toast.success('Registro Modificado');
      handleClickModalFarmacias();
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
  };

  return (
    <div className="md:flex gap-10">
      <div className="md:w-full">
        <div className="flex justify-end">
          <button onClick={handleClickModalFarmacias}>
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
          <h1 className="text-3xl font-bold mb-6 text-center">
            {" "}
            Modificar el registro del usuario:{" "}
            <span style={{ textTransform: "capitalize" }}>
              {name_pharmacies}
            </span>{" "}
          </h1>
          <form onSubmit={handleSubmitFarmacias} noValidate>
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
                    placeholder="Tu nombre"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="text-slate-800 " htmlFor="name_pharmacies">
                    Nombre Farmacia:{" "}
                  </label>
                  <input
                    type="text"
                    id="name_pharmacies"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="name_pharmacies"
                    value={formData.name_pharmacies}
                    placeholder="Tu nombre"
                    onChange={handleInputChange}
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
                    placeholder="Tu email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-slate-800 " htmlFor="code_ds">
                    Codigo DS:{" "}
                  </label>
                  <input
                    type="text"
                    id="code_ds"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="code_ds"
                    value={formData.code_ds}
                    placeholder=""
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="md:w-2/3 px-5 py  shadow">
                <div className="mb-4">
                  <label className="text-slate-800 " htmlFor="addresses">
                    Dirección:{" "}
                  </label>
                  <input
                    type="addresses"
                    id="addresses"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="addresses"
                    value={formData.addresses}
                    onChange={handleInputChange}
                    placeholder="Tu direccion"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-slate-800 " htmlFor="cellphone">
                    Celular:{" "}
                  </label>
                  <input
                    type="cellphone"
                    id="cellphone"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="cellphone"
                    value={formData.cellphone}
                    onChange={handleInputChange}
                    placeholder="Tu celular"
                  />
                </div>
                  <div className="mb-4">
                  <label className="text-slate-800 " htmlFor="clientes_id_ds">
                    Cliente id ds:{" "}
                  </label>
                  <input
                    type="clientes_id_ds"
                    id="clientes_id_ds"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="clientes_id_ds"
                    value={formData.clientes_id_ds}
                    onChange={handleInputChange}
                    placeholder="Tu celular"
                  />
                </div>
                
                

                <div className="mb-4">
                  <label className="text-slate-800 " htmlFor="active">
                    Habilitada:
                  </label>
                  <input
                    type="checkbox"
                    id="active"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="active"
                    value={formData.active}
                    checked={active === 1} // Marca el checkbox si usersEdit.suscripcion es 1
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
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


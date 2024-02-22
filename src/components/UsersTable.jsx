import useAdmin from "../hooks/useAdmin";
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";
import ConfirmacionDelete from "./ConfirmacionDelete"

export default function UsersTable({users}) {

   const{ usersEdit,handleClickModal,handleSetUser,setUsers} = useAdmin();
   const{id,name, lastname,type,email,cellphone,addresses} = users;
const handleDeleteUser = async (id) => {
    try {
    
      const response = await clienteAxios.delete(`/api/deleteUsersAdmin/${id}`);
       setUsers(usersEdit.filter(user => user.id !== id));
        toast.success('Registro Eliminado con exito');
      // Actualizar el estado de tu aplicación si es necesario
    } catch (error) {
      console.error(error);
      // Manejar errores si es necesario
    }
  };

  return (
    <>
    <tr >
              <td className="border border-blue-600 px-4 py-2">{name}</td>
              <td className="border border-blue-600 px-4 py-2">{lastname}</td>
              <td className="border border-blue-600 px-4 py-2">{type.nombre}</td>
              <td className="border border-blue-600 px-4 py-2">{email}</td>
              <td className="border border-blue-600 px-4 py-2">{cellphone}</td>
              <td className="border border-blue-600 px-4 py-2">{addresses}</td>
              <td className="border border-blue-600 px-4 py-2">
                  <div className="flex justify-between ">
        <button
          type="button"
          onClick={() => { 
            handleClickModal();
               handleSetUser(users);
          }}
          className="bg-sky-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
      ConfirmacionDelete({ onConfirm: () => handleDeleteUser(users.id) });
    }}
                    className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
              </td>
            </tr>
    </>
  )
}

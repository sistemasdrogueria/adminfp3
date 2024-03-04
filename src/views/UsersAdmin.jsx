import useSWR from "swr";
import {Link} from 'react-router-dom'
import UsersTable from "../components/UsersTable";
import useAdmin from "../hooks/useAdmin";
import clienteAxios from "../config/axios";
//import { types } from "../data/types";

export default function UsersAdmin() {
 const {} = useAdmin();
 const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/usersAdmin',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/usersAdmin', fetcher)
  if(isLoading) return 'Cargando...';
      const users =data.data ;
  return (
    <div className="overflow-x-auto bg-gray-100  "> 
      <h1 className="text-4xl font-black text-center">Resultado de Usuarios </h1>
        <p className="text-2xl my-10 text-center">Puedes modificar los usuarios.</p>
    <table className="table-auto w-full border-collapse border border-blue-300  ps-1 ">

        <thead>
          <tr>
            <th className="border border-blue-600 px-4 py-2">Nombre</th>
            <th className="border border-blue-600 px-4 py-2">Apellido</th>
            <th className="border border-blue-600 px-4 py-2">Tipo</th>
            <th className="border border-blue-600 px-4 py-2">Email</th>
            <th className="border border-blue-600 px-4 py-2">Telefono</th>
            <th className="border border-blue-600 px-4 py-2">Dirección</th>
             <th className="border border-blue-600 px-4 py-2">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {users.map(users => (
            <UsersTable 
            key={users.id}
            users ={users}
         //   types= {types}
            />
          ))}
        </tbody>
      </table></div>
  )
}

import {Link} from 'react-router-dom'
import useSWR from "swr";
import FarmasTable from "../components/FarmasTable"
import useAdmin from "../hooks/useAdmin";
import clienteAxios from "../config/axios";



export default function FarmaciasAdmin() {
    const {} = useAdmin();
     const fetcher = () => clienteAxios('/api/farmaciasAdmin').then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/farmaciasAdmin', fetcher)
  if(isLoading) return 'Cargando...';
      const farmacias =data.data ;
  return (
   <div className="overflow-x-auto bg-gray-100  "> 
      <h1 className="text-4xl font-black text-center">Resultado de Farmacias </h1>
        <p className="text-2xl my-10 text-center">Puedes modificar las farmacias.</p>
    <table className="table-auto w-full border-collapse border border-blue-300 ps-2">
        <thead>
          <tr>
            <th className="border border-blue-600 px-4 py-2">Farmacia</th>
            <th className="border border-blue-600 px-4 py-2">Nombre</th>
            <th className="border border-blue-600 px-4 py-2">Email</th>
            <th className="border border-blue-600 px-4 py-2">Celular</th>
            <th className="border border-blue-600 px-4 py-2">Codigo ds</th>
            <th className="border border-blue-600 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {farmacias.map(farmacias => (
            <FarmasTable 
            key={farmacias.id}
            farmacias ={farmacias}
            />
          ))}
        </tbody>
      </table></div>
  )
}

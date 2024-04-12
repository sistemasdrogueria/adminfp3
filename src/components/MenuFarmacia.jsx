import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';


export default function MenuFarmacia() {
    const {user,logout}= useAuth({middleware:'Auth'});
     const location = useLocation();

  const linkStyle = (path) => {
        return `text-lg font-bold transition-colors duration-300 ${
            location.pathname === path ? 'bg-blue-200 text-blue-800 border rounded-lg' : 'text-blue-600 hover:text-blue-800'
        }`;
    };
  return (
  <div className="bg-white shadow-lg">
            <h3 className='font-bold px-8 text-lg text-center py-4 rounded-lg border  border-gray-200'>Hola {user?user.name:""}</h3>
               <nav className='flex flex-col p-6 space-y-2 border text-center rounded-lg'>
                <Link to="/admin/farmacia/ordersUsers" className={`hover:bg-blue-400 hover:rounded-lg ${linkStyle("/admin/farmacia/ordersUsers")}`}>Ordenes Usuarios</Link>
                <Link to="/admin/farmacia/ordersDrogueria" className={`hover:bg-blue-400 hover:rounded-lg  ${linkStyle("/admin/farmacia/ordersDrogueria")}`}>Ordenes Drogueria</Link>
                <Link to="/admin/farmacia/estadisticas" className={`hover:bg-blue-400 hover:rounded-lg  ${linkStyle("/admin/farmacia/estadisticas")}`}>Estadísticas</Link>
                <Link to="/admin/farmacia/perfil" className={`hover:bg-blue-400 hover:rounded-lg  ${linkStyle("/admin/farmacia/perfil")}`}>Cargar Información</Link>
            </nav>

            <div className='my-5 px-5'>
                <button className='text-center bg-red-600 hover:bg-red-700 w-full p-3 text-white font-bold transition-colors duration-300' onClick={logout}>Cerrar Sesión</button>
            </div>
        </div>
  )
}

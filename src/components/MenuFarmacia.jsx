import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';


export default function MenuFarmacia() {
    const {user,logout}= useAuth({middleware:'Auth'});
console.log(user);
  return (
  <div className="bg-white shadow-lg">
            <h3 className='font-bold px-8 text-lg py-4 border-b border-gray-200'>Hola {user?user.name:""}</h3>
            <nav className='flex flex-col p-8 space-y-2'>
                <Link to="/admin/farmacia/ordersUsers" className='text-blue-600 hover:text-blue-800 font-bold text-lg transition-colors duration-300'>Ordenes Usuarios</Link>
                <Link to="/admin/farmacia/ordersDrogueria" className='text-blue-600 hover:text-blue-800 font-bold text-lg transition-colors duration-300'>Ordenes Drogueria</Link>
                <Link to="/admin/farmacia" className='text-blue-600 hover:text-blue-800 font-bold text-lg transition-colors duration-300'>Estadísticas</Link>
                <Link to="/admin/farmacia/perfile" className='text-blue-600 hover:text-blue-800 font-bold text-lg transition-colors duration-300'>Cargar Información</Link>
            </nav>

            <div className='my-5 px-5'>
                <button className='text-center bg-red-600 hover:bg-red-700 w-full p-3 text-white font-bold transition-colors duration-300' onClick={logout}>Cerrar Sesión</button>
            </div>
        </div>
  )
}

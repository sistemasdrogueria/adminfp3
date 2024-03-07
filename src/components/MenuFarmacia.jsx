import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';


export default function MenuFarmacia() {
    const {logout}= useAuth({middleware:'Auth'});
  return (
     <div className="bg-white">
      <nav className='flex flex-col p-4'>
    <Link to="/admin/farmacia/ordersUsers" className='font-bold text-lg'>Ordenes Usuarios</Link>
    <Link to="/admin/farmacia/ordersDrogueria" className='font-bold text-lg'>Ordenes Drogueria</Link>
    <Link to="/admin/farmacia" className='font-bold text-lg'>Modificar Perfil</Link>
     </nav>

     <div className='my-5 px-5'>
        <button className=' text-center bg-red-600 w-full p-3 truncate text-white font-bold' onClick={logout}>Cerrar Sesión</button>
     </div>
    </div>
  )
}

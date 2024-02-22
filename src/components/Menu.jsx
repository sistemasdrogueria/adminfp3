
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useAdmin from "../hooks/useAdmin";
import { useAuth } from '../hooks/useAuth';
export default function Menu() {
const {activeLink,setActiveLink} = useAdmin()
const {logout} = useAuth({middleware:'auth'});
  return (
    <div className="bg-white">
      <ul>
        <li className={`flex items-center gap-4 border w-full p-3 cursor-pointer ${activeLink === '/usersAdmin' && 'bg-amber-400'}`} onMouseEnter={() => setActiveLink('/usersAdmin')} onMouseLeave={() => setActiveLink('')}><Link to="/usersAdmin">Usuarios Fp</Link></li>
        <li className={`flex items-center gap-4 border w-full p-3 cursor-pointer ${activeLink === '/farmaciasAdmin' && 'bg-amber-400'}`} onMouseEnter={() => setActiveLink('/farmaciasAdmin')} onMouseLeave={() => setActiveLink('')}><Link to="/farmaciasAdmin">Farmacias</Link></li>
        <li className={`flex items-center gap-4 border w-full p-3 cursor-pointer ${activeLink === '/pedidosDrogueria' && 'bg-amber-400'}`} onMouseEnter={() => setActiveLink('/pedidosDrogueria')} onMouseLeave={() => setActiveLink('')}><Link to="/pedidosDrogueria">Pedidos Drogueria</Link></li>
        <li className={`flex items-center gap-4 border w-full p-3 cursor-pointer ${activeLink === '/pedidosUsers' && 'bg-amber-400'}`} onMouseEnter={() => setActiveLink('/pedidosUsers')} onMouseLeave={() => setActiveLink('')}><Link to="/pedidosUsers">Pedidos Usuarios</Link></li>
        <li className={`flex items-center gap-4 border w-full p-3 cursor-pointer ${activeLink === '/categorias' && 'bg-amber-400'}`} onMouseEnter={() => setActiveLink('/categorias')} onMouseLeave={() => setActiveLink('')}><Link to="/categorias">Categorias</Link></li>
        <li className={`flex items-center gap-4 border w-full p-3 cursor-pointer ${activeLink === '/contacto' && 'bg-amber-400'}`} onMouseEnter={() => setActiveLink('/contacto')} onMouseLeave={() => setActiveLink('')}><Link to="/contacto">Pf dcto</Link></li>
        <button onClick={logout} className='flex items-center gap-4 border w-full p-3 cursor-pointer bg-red-400'>Salir</button>

      </ul>
    </div>
  );
}
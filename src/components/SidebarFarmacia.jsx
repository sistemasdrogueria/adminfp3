import MenuFarmacia from './MenuFarmacia';
import { useState } from 'react';

export default function SidebarFarmacia() {
  const [isOpen, setIsOpen] = useState(false); // Definir el estado para controlar la visibilidad del menú

  // Función para cambiar el estado y mostrar/ocultar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <aside className="sm:h-full md:w-72 md:h-screen lg:h-screen ">
      <div className="p-4">
        <img 
          src="/img/logo.png" 
          alt="Imagen de logo"
          className="w-35"
        />
      </div>

      {/* Menú para dispositivos móviles */}
      <div className="-mr-0 flex items-center justify-end lg:hidden">
        <button
          onClick={toggleMenu}
          type="button"
          className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Abrir menú</span>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

        </button>
      </div>

      {/* Contenido del menú */}
      <div className="mt-5 border-1 lg:border-0 lg:block">
        <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`} id="mobile-menu">
          <MenuFarmacia />
        </div>
        <div className="hidden lg:block">
          <MenuFarmacia />
        </div>
      </div>
    </aside>
  );
}
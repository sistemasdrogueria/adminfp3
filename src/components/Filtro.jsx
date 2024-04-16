
import { useEffect } from "react";
import useAdmin from "../hooks/useAdmin";


  // Estado para almacenar el filtro seleccionado


export default function Filtro({pedidosUsers }) {
   const {handleFiltroChange,color,setColor } = useAdmin();


  // Función para manejar el cambio de filtro
  const handleFiltro = (color) => {
    setColor(color);
    handleFiltroChange(color,pedidosUsers)
  };

    useEffect(() => {
        handleFiltro('rojo'); // Establecer a pedidos pendientes en el montaje
    }, []);
  return (
    <>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 ${color === 'blanco' ? 'bg-gray-600 border-2 border-black shadow-lg ' : 'bg-gray-300 hover:bg-gray-300 text-gray-600 '}`} onClick={() => handleFiltro('blanco')}>Todos los Pedidos</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 ${color === 'rojo' ? 'bg-red-300 border-2 border-black shadow-lg ' : 'bg-red-200 hover:bg-red-300 text-gray-600 '}`} onClick={() => handleFiltro('rojo')}>Pedidos Pendientes</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 ${color === 'verde' ? 'bg-green-600 border-2 border-black shadow-lg' : 'bg-green-200 hover:bg-green-300 text-gray-600'}`} onClick={() => handleFiltro('verde')}>Pedidos Solicitados</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 ${color === 'naranja' ? 'bg-orange-600 border-2 border-black shadow-lg' : 'bg-orange-200 hover:bg-orange-300 text-gray-600'}`} onClick={() => handleFiltro('naranja')}>Pedidos Pendientes de Droguería</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 ${color === 'indigo' ? 'bg-indigo-800 border-2 border-black shadow-lg' : 'bg-indigo-600 hover:bg-indigo-300 text-gray-600'}`} onClick={() => handleFiltro('indigo')}>Pedidos Cancelados</button>
    </>
  );
}



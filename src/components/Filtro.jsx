
import useAdmin from "../hooks/useAdmin";


  // Estado para almacenar el filtro seleccionado


export default function Filtro({pedidosUsers }) {
   const {handleFiltroChange,color,setColor } = useAdmin();


  // Función para manejar el cambio de filtro
  const handleFiltro = (color) => {
    setColor(color);
    handleFiltroChange(color,pedidosUsers)
  };
  return (
    <>
      <button className="sm: w-80 inline-block mb-2 ms-2 hover:bg-white text-black font-bold py-2 px-4 rounded bg-gray-500  border"   onClick={() => handleFiltro('blanco')}>Todos los Pedidos</button>
      <button className="sm: w-80 inline-block mb-2 ms-2 hover:bg-white text-black font-bold py-2 px-4 rounded bg-red-200"   onClick={() => handleFiltro('rojo')}>Pedidos Pendientes</button>
      <button className="sm: w-80 inline-block mb-2 ms-2 hover:bg-white text-black font-bold py-2 px-4 rounded bg-green-200" onClick={() => handleFiltro('verde')}>Pedidos Solicitados</button>
      <button className="sm: w-80 inline-block mb-2 ms-2 hover:bg-white text-black font-bold py-2 px-4 rounded bg-orange-200" onClick={() => handleFiltro('naranja')}>Pedidos Pendientes de Droguería</button>
      <button className="sm: w-80 inline-block mb-2 ms-2 hover:bg-white text-black font-bold py-2 px-4 rounded bg-indigo-800" onClick={() => handleFiltro('indigo')}>Pedidos Cancelados</button>
    </>
  );
}



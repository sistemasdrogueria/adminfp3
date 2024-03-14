
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
      {/* Botones de filtro */}
      <button className="inline-block  hover:bg-white text-black font-bold py-2 px-4 rounded bg-red-200"   onClick={() => handleFiltro('rojo')}>Pedidos Pendientes</button>
      <button className="inline-block  hover:bg-white text-black font-bold py-2 px-4 rounded bg-green-200" onClick={() => handleFiltro('verde')}>Pedidos Completados</button>
      <button className="inline-block  hover:bg-white text-black font-bold py-2 px-4 rounded bg-orange-200" onClick={() => handleFiltro('naranja')}>Pedidos Pendientes de Droguería</button>

    
    </>
  );
}



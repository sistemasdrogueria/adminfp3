import { useEffect } from "react";
import useAdmin from "../hooks/useAdmin";


export default function FiltroDrog({pedidosUsers}) {
const {handleDrogFiltroChange,estado,setEstado } = useAdmin();
      // Función para manejar el cambio de filtro
  const handleFiltro = (estado) => {
    setEstado(estado);
    handleDrogFiltroChange(estado,pedidosUsers)
  };

    useEffect(() => {
        handleFiltro(1); // Establecer a pedidos pendientes en el montaje
    }, []);

  
  return (
      <>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 bg-green-100 border-2 border-black shadow-lg  hover:bg-green-200 text-gray-600 `} onClick={() => handleFiltro(1)}>Recibido</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 bg-green-200 border-2 border-black shadow-lg  hover:bg-green-300 text-gray-600 `} onClick={() => handleFiltro(2)}>A facturar</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 bg-green-300 border-2 border-black shadow-lg  hover:bg-green-400 text-gray-600 `} onClick={() => handleFiltro(3)}>Facturado</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 bg-green-400 border-2 border-black shadow-lg  hover:bg-green-400 text-gray-600 `} onClick={() => handleFiltro(4)}>A enviar</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 bg-green-500 border-2 border-black shadow-lg  hover:bg-green-600 text-gray-600 `} onClick={() => handleFiltro(5)}>Enviado</button>
            <button className={`sm:w-80 inline-block mb-2 ms-2 font-bold py-2 px-4 rounded  transition-all duration-300 bg-red-400 border-2 border-black shadow-lg    hover:bg-red-500 text-gray-600 `}   onClick={() => handleFiltro(6)}>Anulado</button>
    </>
  )
}

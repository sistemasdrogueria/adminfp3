import {useState, useEffect} from "react";
import useAdmin from "../hooks/useAdmin"
import clienteAxios from "../config/axios";
import CardFarmItem from "./CardFarmItem";



export default function ModalOrdersMod() {
     const {
    hanldeClickModalOrderMod,
    pedidosUsersView,
    idsArticulosInOrders,
    articulos,setArticulos
  } = useAdmin();

  const [solicitudEnviada, setSolicitudEnviada] = useState(false); // Estado para controlar si la solicitud ya ha sido enviada
   const item = JSON.parse(pedidosUsersView.items);
  const [items,setItems] = useState(item);
 

  useEffect(() => {
    async function enviarSolicitud() {
      try {
        const ids = { ids: idsArticulosInOrders };
            const token = localStorage.getItem('AUTH_TOKEN')
        const respuesta = await clienteAxios.post("api/articulosAdmin", ids,
{
    headers:{
        Authorization:`Bearer ${token}`
    }
});

        // Filtrar los elementos de items que coinciden con los IDs de la respuesta
        const articulosFiltrados = items.filter((pedidoItem) =>
          respuesta.data.data.some((item) => item.id === pedidoItem.articulo_id)
        );

        // Asignar la información del artículo a cada elemento de items
        articulosFiltrados.forEach((pedidoItem) => {
          const articulo = respuesta.data.data.find(
            (item) => item.id === pedidoItem.articulo_id
          );
          pedidoItem.articulo = articulo;
        });
        // Establecer los elementos con la información del artículo
        setArticulos(articulosFiltrados);
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
    }

    // Verificar si la solicitud ya ha sido enviada antes de enviarla nuevamente
    if (!solicitudEnviada) {
      enviarSolicitud();
      setSolicitudEnviada(true); // Marcar la solicitud como enviada
    }
  }, [idsArticulosInOrders, items, solicitudEnviada]);

  return (
    <div>
    <div className="md:w-full  ">
    <div className="flex justify-end">
      <button onClick={hanldeClickModalOrderMod}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
     <div className="w-full flex">
      <div className=" w-4/6 bg-gray-100  p-2">

<form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
             fill="none"
              viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Productos ..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
    </div>
</form>

      </div>
       <div  className="w-1/3  bg-gray-100 border  overflow-y-scroll">
        <div className="h-1/6 bg-white ">
          <h3 className="font-black  text-center">Carrito Cliente</h3>
          
          
        </div>

         <div className=" justify-center  ">
          {articulos.map((pedidoItem) => (
            <CardFarmItem key={pedidoItem.articulo_id} items={pedidoItem} pedido={items} itemsoriginal={JSON.parse(pedidosUsersView.items)} pedidoid={pedidosUsersView.id} />
          ))}
        </div>
       
      </div>



     </div>

    </div>
    <div className="w-full flex justify-center">
<button type="button" className="m-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Confirmar Pedido Usuario</button>
<button type="button" className="m-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar Pedido</button>

    </div>
    </div>
  )
}

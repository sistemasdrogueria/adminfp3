import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import clienteAxios from "../config/axios";
import ResultItemsClients from "./ResultItemsClients";
import ResultItemsDrogueria from "./ResultItemsDrogueria";


export default function ModalOrdersDetails() {
 const {handleClickModalOrdersDetails, pedidosUsersView, idsArticulosInOrders, articulos, setArticulos,articulosDrog, setArticulosDrog,setItemsMod,idsArticulosDrogInOrders } = useAdmin();
 const [solicitudEnviada, setSolicitudEnviada,] = useState(false); 
  const [solicitudEnviadaDrog, setSolicitudEnviadaDrog,] = useState(false); 
 const items =     JSON.parse(pedidosUsersView.items);
const itemsDrog = pedidosUsersView.orders_drogueria && pedidosUsersView.orders_drogueria.items
  ? JSON.parse(pedidosUsersView.orders_drogueria.items)
  : {};

const token = localStorage.getItem('AUTH_TOKEN')
 /*const respuestadrog = clienteAxios.post("api/adminPharmacies/ordersDrogueria/getOrdersDrogueria", {id:pedidosUsersView.id}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      */
 
 useEffect(() => {
  async function enviarSolicitud() {
    try {
      const ids = { ids: idsArticulosInOrders };
      const token = localStorage.getItem('AUTH_TOKEN')
     const respuesta = await clienteAxios.post("api/articulosAdmin", ids, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filtrar los elementos de items que coinciden con los IDs de la respuesta
      const articulosFiltrados = items.filter((pedidoItem) =>
        respuesta.data.data.some((item) => item.id === pedidoItem.articulo_id)
      );

      // Crear una nueva lista de artículos con la información actualizada
      const articulosActualizados = articulosFiltrados.map((pedidoItem) => {
        const articulo = respuesta.data.data.find((item) => item.id === pedidoItem.articulo_id);
        return { ...pedidoItem, articulo };
      });

      // Establecer los artículos actualizados
      setArticulos(articulosActualizados);
      setItemsMod(JSON.parse(pedidosUsersView.items));
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }

  // Verificar si la solicitud ya ha sido enviada antes de enviarla nuevamente
  if (!solicitudEnviada) {
    enviarSolicitud();
    setSolicitudEnviada(true); // Marcar la solicitud como enviada
  }
}, [idsArticulosInOrders, solicitudEnviada]);

useEffect(() => {
  async function enviarSolicitudDrog() {

    try {
      const ids = { ids: idsArticulosDrogInOrders };
     
      const token = localStorage.getItem('AUTH_TOKEN')

      if(ids.ids.length > 0 ){
     const respuesta = await clienteAxios.post("api/articulosAdmin", ids, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

     
      // Filtrar los elementos de items que coinciden con los IDs de la respuesta
  if(itemsDrog.length > 0 ){
      const articulosFiltrados = itemsDrog.filter((pedidoItem) =>
        respuesta.data.data.some((item) => item.id === pedidoItem.articulo_id)
      );

      // Crear una nueva lista de artículos con la información actualizada
      const articulosActualizados = articulosFiltrados.map((pedidoItem) => {
        const articulo = respuesta.data.data.find((item) => item.id === pedidoItem.articulo_id);
        return { ...pedidoItem, articulo };
      });

      // Establecer los artículos actualizados
      setArticulosDrog(articulosActualizados);
      setItemsMod(JSON.parse(pedidosUsersView.orders_drogueria.items));
    }else{
      setArticulosDrog();
      setItemsMod();
    }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }

  // Verificar si la solicitud ya ha sido enviada antes de enviarla nuevamente
  if (!solicitudEnviadaDrog) {
    enviarSolicitudDrog();
    setSolicitudEnviadaDrog(true); // Marcar la solicitud como enviada
  }
}, [idsArticulosDrogInOrders, solicitudEnviadaDrog]);

  return (
    <div>
      <div className="md:w-full  ">
        <div className="flex justify-end">
          <button onClick={handleClickModalOrdersDetails}>
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
        <div className="w-full md:flex sm:flex-col lg:flex-row border rounded-lg md:justify-center">
        <div className="sm:w-full md:w-1/2">
    <h1 className="text-3xl font-black  text-center mb-3  mt-2">Pedido para cliente</h1>
 

 {articulos.map(articulo => ( 
    <ResultItemsClients
      key={articulo.articulo.id}
      articulos={articulo}
    />
  ))}
      
        </div>
        
        <div className="sm:w-full md:w-1/2">
    <h1 className="text-3xl font-black  text-center mb-3  mt-2">Pedido para Drogueria</h1>
      {articulosDrog && articulosDrog.length > 0 ? (
        articulosDrog.map(articuloDrog => (
          <ResultItemsDrogueria
            key={articuloDrog.articulo_id}
            articuloDrog={articuloDrog}
          />
        ))
      ) : (
           <div className="p-2  border shadow rounded-lg bg-white m-2">
      <div className=" h-24 bg-white flex items-center">
        <p className="text-center w-full">Cancelaste pedido para  droguería.</p>
        </div>
          </div>
      )}
        </div>

        </div>
      </div>
    </div>
  );
}

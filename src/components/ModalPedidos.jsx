import useAdmin from "../hooks/useAdmin";
import CardItem from "./CardItem";
import clienteAxios from "../config/axios";
import { useEffect, useState } from "react";

export default function ModalPedidos() {
  const {
    handleClickModalPedidosUsers,
    pedidosUsersView,
    idsArticulosInOrders,
  } = useAdmin();
  const [articulos, setArticulos] = useState([]);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false); // Estado para controlar si la solicitud ya ha sido enviada
  const items = JSON.parse(pedidosUsersView.items);

  useEffect(() => {
    async function enviarSolicitud() {
      try {
        const ids = { ids: idsArticulosInOrders };
        const respuesta = await clienteAxios.post("api/articulosAdmin", ids);

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
  }, [idsArticulosInOrders, items, solicitudEnviada]); // Agregar solicitudEnviada como dependencia

  return (
    <div className="md:flex gap-10">
      <div className="md:w-full">
        <div className="flex justify-end">
          <button onClick={handleClickModalPedidosUsers}>
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
        <h1 className="text-3xl font-bold mb-6 text-center">
          {" "}
          Articulos en el pedido #
          <span className="capitalize">{pedidosUsersView.id}</span>{" "}
        </h1>
        <div className="flex flex-wrap justify-center   overflow-y-scroll">
          {articulos.map((pedidoItem) => (
            <CardItem key={pedidoItem.articulo_id} items={pedidoItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
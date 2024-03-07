import { useEffect, useState } from "react";
import { formatearDinero } from "../helpers";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function CardFarmItem({ items, pedido,itemsoriginal,pedidoid}) {
    const [ cantidad,setCantidad ] = useState(items.cantidad)
     const [ total,setTotal ] = useState(items.precio_publico)
      const {handleEliminarProductoPedido, setArticulos} = useAdmin();
   

       const handleIncrement = () => {
    setCantidad(cantidad + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

      useEffect(() => {
    setTotal(items.precio_publico * cantidad);
  }, [cantidad, items.precio_publico]);

const handleEliminarProducto = (articulo_id) => {
        // Mostrar la alerta de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
             
   
    const pedidoActualizado = pedido.filter((producto) => producto.articulo_id !== articulo_id);
    const itemsActualizado = itemsoriginal.filter((producto) => producto.articulo_id !== articulo_id);
   
    setArticulos(pedidoActualizado);
   toast.success("Eliminado del pedido");
 handleEliminarProductoPedido(pedidoid,itemsActualizado);
            }
        });
    };
  return (
    <div className="p-2  flex items-center border shadow rounded-lg bg-white m-2">
      <div className="w-28 bg-white">
        <img
          src={`https://www.drogueriasur.com.ar/ds/img/productos/${items.articulo.imagen}`}
          alt={`Imagen producto ${items.articulo.descripcion_pag}`}
        />
      </div>
      <div className="flex flex-col w-72">
        <p className="font-black ">
            {items.articulo.descripcion_pag}</p>

        <p className="mt-2 text-gray-500">
             {formatearDinero(total)}</p>
        <div className="flex gap-4 justify-center  items-center w-36 ">
            <div className="flex gap-4 justify-center  w-36 mt-2 border rounded-md shad">
          <button type="button"
          onClick={handleDecrement}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <p className="text-3xl"> 
          {cantidad}</p>
          <button type="button"
           onClick={handleIncrement}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
            </div>
          <div className="ms-2 ">
            <button
          type="button"
          onClick={()=> {
            handleEliminarProducto(items.articulo_id)
          }}
                    className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
          </div>
          
          
        </div>
        
      </div>
    </div>
  );
}

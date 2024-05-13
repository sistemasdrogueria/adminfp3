import React from 'react'
import { setDate } from "../helpers/setDate";
import useAdmin from "../hooks/useAdmin"
export default function PedidosCardDrogMod({pedidos,pedidosKey,pedidoAll}) {

    const {handleSetPedidosDrogView,handleSetArticulosInOrders,handleClickModalOrdersDrogDetails,handleSetArticulosDrogInOrders} = useAdmin();

   const calcularPorcentaje = (estadoId) => {
    switch (estadoId) {
      case 1:
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      case 5:
        return 100;
      case 6:
        return 0;

      default:
        return 0;
    }
  };

  const porcentaje = calcularPorcentaje(pedidos.estado_id);
  return (
   <div className={`w-full p-4 ${pedidos.estado_id === 1 ? 'border-orange-500 shadow-green' : pedidos.estado_id === 8 ? 'border-red-500 shadow-red' : ''}`}>
        <div className={`max-w-md mx-auto border  rounded-xl shadow-md overflow-hidden md:max-w-2xl ${pedidos.estado_id === 1 ? 'border-white shadow-green-100 bg-green-100 ' : pedidos.estado_id === 2 ? 'border-white  shadow-green-200 bg-green-200 '  :pedidos.estado_id === 3?'border-white  shadow-green-300 bg-green-300 ':pedidos.estado_id === 4 ? 'border-white shadow-green-400 bg-green-400 ' : pedidos.estado_id === 5 ? 'border-white  shadow-green-500 bg-green-500 ': pedidos.estado_id === 6 ? 'border-white  shadow-danger-300 bg-danger-300': null}`}>
          <div className="md:flex justify-center">
            <div className="md:flex-shrink-0">
            
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Pedido drogueria#{pedidos.id}</div>
              <p className="mt-2 text-gray-500">Fecha: <span className="capitalize p-1">{setDate(pedidos.created_at)}</span></p>
              <p className="mt-2 text-gray-500">Orden Usuario:<span className="capitalize p-1">{pedidos.order_id}</span> </p>
              <p className="mt-2 text-gray-500">Farmacia:<span className="capitalize p-1">{}</span> </p>
              <p className="mt-2 text-gray-500">Cantidad de items: <span className="capitalize p-1">{pedidos.cantidad_item}</span> </p>
              <p className="mt-2 text-gray-500">Estado:<span className="capitalize  font-bold p-1">{pedidos.estado_drogueria?pedidos.estado_drogueria.nombre: ""}</span> </p>
            <div className="mt-2">
              <p className="text-gray-500">Progreso:</p>
              <div className="w-full bg-gray-200 rounded">
                <div className={`bg-blue-500 text-white py-1 rounded`} style={{ width: `${porcentaje}%` }}>
                  {`${porcentaje}%`}
                </div>
              </div>
            </div>
              <div className="mt-4">
                <button className={`inline-block text-white font-bold py-2 px-4 rounded hover:bg-blue-300 shadow-blue-300 bg-blue-400`}
             onClick={() => { 
            
             
            handleClickModalOrdersDrogDetails();
            handleSetPedidosDrogView(pedidos);
             handleSetArticulosDrogInOrders(pedidos.items)
    
   
             }}
                >
                 Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

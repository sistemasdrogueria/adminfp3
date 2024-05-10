import useAdmin from "../hooks/useAdmin"
import { setDate } from "../helpers/setDate";
import { toast } from "react-toastify";
import { useEffect } from "react";
export default function PedidosCardMod({pedidos,pedidosKey,pedidoAll}) {
    const {handleClickModalOrderMod,handleSetPedidosUsers,handleSetArticulosInOrders,handleSetArticulosDrogInOrders,handleClickModalOrderDrogMod,handleClickModalOrdersDetails,timeChanged,idPedidoTimeChanged,newTime} = useAdmin();
  
 
  return (
<div className={`w-full  p-4 ${pedidos.estado_id === 1 ? 'border-orange-500 shadow-green' : pedidos.estado_id === 8 ? 'border-red-500 shadow-red' : ''}`}>
        <div className={`max-w-md mx-auto border  rounded-xl shadow-md overflow-hidden md:max-w-2xl ${pedidos.estado_id === 1 ? ' shadow-green bg-orange-200 ' : pedidos.estado_id === 8 ? 'border-white  shadow-red-300 bg-red-200 '  :pedidos.estado_id === 12 ? 'border-white  shadow-indigo-400 bg-indigo-400 ':'border-white  shadow-green-300 bg-green-200 '}`}>
          <div className="md:flex">
            <div className="md:flex-shrink-0">
            
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Pedido #{pedidos.id}</div>
              <p className="mt-2 text-gray-500">Fecha: <span className=" p-1">{setDate(pedidos.created_at)}</span></p>
              <p className="mt-2 text-gray-500">Farmacia:<span className="capitalize p-1">{}</span> </p>
              <p className="mt-2 text-gray-500">Cantidad de items: <span className="capitalize p-1">{JSON.parse(pedidos.items).length}</span> </p>
              <p className="mt-2 text-gray-500">Usuario: <span className="capitalize p-1">{pedidos.users.name}</span></p>
              <p className="mt-2 text-gray-500">Estado:<span className="capitalize  font-bold p-1">{pedidos.estados?pedidos.estados.nombre: ""}</span> </p>
              <div className="mt-4">
                <button className={`inline-block text-white font-bold py-2 px-4 rounded ${pedidos.estado_id== 8 ?'hover:bg-red-300 shadow-red-300 bg-red-400':(pedidos.estado_id== 1 ? 'hover:bg-orange-300 shadow-orange-300 bg-orange-400':pedidos.estado_id== 12? 'hover:bg-indigo-300 shadow-indigo-500 bg-indigo-600':pedidos.estado_id== 2? 'hover:bg-green-300 shadow-green-300 bg-green-400': pedidos.estado_id== 0?'shadow-indigo-500 bg-indigo-600':null)}`}
             onClick={() => { 
            
              if(pedidos.estado_id===8){   
             handleClickModalOrderMod()
             handleSetPedidosUsers(pedidos);
             handleSetArticulosInOrders(pedidos.items)
      
              }else if(pedidos.estado_id===1){
             handleClickModalOrderDrogMod()
             handleSetPedidosUsers(pedidos);
             handleSetArticulosInOrders(pedidos.items)
              }else if (pedidos.estado_id== 12){
               toast.warning("Cancelaste este pedido!");
              }else if (pedidos.estado_id== 13){
               toast.warning("Pedido Cancelado por la drogueria.");
              }else if (pedidos.estado_id== 14){
               toast.warning("Pedido Cancelado por el usuario.");
              }else if(pedidos.estado_id == 2 || pedidos.estado_id == 10 ){
            handleClickModalOrdersDetails();
            handleSetPedidosUsers(pedidos);
            handleSetArticulosInOrders(pedidos.items)
            if(pedidos.orders_drogueria && pedidos.orders_drogueria .length > 0){
            handleSetArticulosDrogInOrders(pedidos.orders_drogueria.items)

            }
           
              }else{

                console.log("Hubo un error")
              }
   
             }}
                >
                 {pedidos.estado_id== 8 ?'Solicitar Pedidos':(pedidos.estado_id== 1 ? 'Falta Pedido drogueria':pedidos.estado_id== 12? 'Pedido Cancelado': 'Ver detalles')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

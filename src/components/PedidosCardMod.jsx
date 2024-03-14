import useAdmin from "../hooks/useAdmin"
export default function PedidosCardMod({pedidos,pedidosKey}) {
    const {handleClickModalOrderMod,handleSetPedidosUsers,handleSetArticulosInOrders,handleClickModalOrderDrogMod} = useAdmin();
  return (
<div className={`w-full sm:w-1/2 lg:w-1/3 p-4 ${pedidos.estado_id === 2 ? 'border-orange-500 shadow-green' : pedidos.estado_id === 8 ? 'border-red-500 shadow-red' : ''}`}>
        <div className={`max-w-md mx-auto border  rounded-xl shadow-md overflow-hidden md:max-w-2xl ${pedidos.estado_id === 2 ? ' shadow-green bg-orange-200 ' : pedidos.estado_id === 8 ? 'border-white  shadow-red-300 bg-red-200 '  : ''}`}>
          <div className="md:flex">
            <div className="md:flex-shrink-0">
            
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Pedido #{pedidos.id}</div>
              <p className="mt-2 text-gray-500">Fecha: <span className="capitalize">{pedidos.created_at}</span></p>
              <p className="mt-2 text-gray-500">Farmacia:<span className="capitalize">{}</span> </p>
              <p className="mt-2 text-gray-500">Cantidad de items: <span className="capitalize">{JSON.parse(pedidos.items).length}</span> </p>
              <p className="mt-2 text-gray-500">Usuario: <span className="capitalize">{pedidos.users.name}</span></p>
              <p className="mt-2 text-gray-500">Estado:<span className="capitalize">{pedidos.estado_id}</span> </p>
              <div className="mt-4">
                <button className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
             onClick={() => { 
            
              if(pedidos.estado_id===8){
             handleClickModalOrderMod()
             handleSetPedidosUsers(pedidos);
             handleSetArticulosInOrders(pedidos.items)
              }else if(pedidos.estado_id===2){
             handleClickModalOrderDrogMod()
                 handleSetPedidosUsers(pedidos);
             handleSetArticulosInOrders(pedidos.items)
              }else{
                console.log("felicidades ya solicitaste ambos pedidos");
              }
   
             }}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

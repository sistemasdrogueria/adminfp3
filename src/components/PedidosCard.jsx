import useAdmin from "../hooks/useAdmin"
export default function PedidosCard({pedidos}) {
const {handleClickModalPedidosUsers,handleSetPedidosUsers,handleSetArticulosInOrders,} = useAdmin();

  return (
   <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
        <div className="max-w-md mx-auto border bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
             onClick={() => {  handleClickModalPedidosUsers()
             handleSetPedidosUsers(pedidos);
             handleSetArticulosInOrders(pedidos.items)
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

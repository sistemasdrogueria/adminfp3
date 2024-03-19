
import useSWR from "swr";
import clienteAxios from "../config/axios";
import useAdmin    from "../hooks/useAdmin";
import PedidosCardMod from "../components/PedidosCardMod";
import Filtro from "../components/Filtro";


export default function OrdersUsers() {const token = localStorage.getItem('AUTH_TOKEN')
   const {pedidosFiltrados,setPedidosFiltrados} = useAdmin();
     const fetcher = () => clienteAxios('/api/adminPharmacies/orders',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/adminPharmacies/orders', fetcher,{ refreshInterval: 300000 })
  if(isLoading) return 'Cargando...';
      const pedidosUsers =data.data ;


   
  return (
    <div className="flex flex-col w-full sm:w-auto" >
     <div> <h1 className="text-4xl font-black text-center">Ordenes de Usuarios </h1>
        <p className="text-2xl my-10 text-center">Administre las ordenes desde aquí</p></div>
        
        <div className="md:flex w-full md:justify-around p-10 sm:grid grid-cols-2">
        <h3 className="text-2xl">Filtrar por: </h3>
      <Filtro  pedidosUsers={pedidosUsers} />
      </div>
       
        <div className="w-full">
  <div className="flex flex-wrap justify-center">
  
   {pedidosFiltrados.length > 0 ? (
  pedidosFiltrados.map(pedido => ( 
    <PedidosCardMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id} 
    />
  ))
) : (
  pedidosUsers.map(pedido => ( 
    <PedidosCardMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id} 
    />
  ))
)}
  
    
  </div>
</div>
 </div>
        
  )
}

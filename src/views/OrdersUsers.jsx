import useSWR from "swr";
import clienteAxios from "../config/axios";
import useAdmin    from "../hooks/useAdmin";
import PedidosCardMod from "../components/PedidosCardMod";

export default function OrdersUsers() {const token = localStorage.getItem('AUTH_TOKEN')
   const {} = useAdmin();
     const fetcher = () => clienteAxios('/api/adminPharmacies/orders',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/adminPharmacies/orders', fetcher)
  if(isLoading) return 'Cargando...';
      const pedidosUsers =data.data ;
  return (
    <div>
     <div> <h1 className="text-4xl font-black text-center">Ordenes de Usuarios </h1>
        <p className="text-2xl my-10 text-center">Administre las ordenes desde aquí</p></div>
        <div className="w-full">
  <div className="flex flex-wrap justify-center">
    {pedidosUsers.map(pedidos => ( 
       <PedidosCardMod
       key={pedidos.id}
       pedidos={pedidos}
       pedidoKey={pedidos.id} 
       
       />) )}
  
    
  </div>
</div>
 </div>
        
  )
}


import useSWR, { mutate } from 'swr';
import clienteAxios from "../config/axios";
import useAdmin    from "../hooks/useAdmin";
import PedidosCardMod from "../components/PedidosCardMod";
import Filtro from "../components/Filtro";
import Search from '../components/Search';



export default function OrdersUsers() {const token = localStorage.getItem('AUTH_TOKEN')
   const {pedidosFiltrados,setPedidosFiltrados,handleSetPedidos,pedidos,} = useAdmin();

   
     const fetcher = () => clienteAxios('/api/adminPharmacies/orders',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/adminPharmacies/orders', fetcher,{ refreshInterval: 300000 })
  if(isLoading) return 'Cargando...';
    const pedidosUsers =data.data ;

 const handleSearch = (searchData) => {
    const { searchTerm, startDate, endDate } = searchData;
    console.log(searchData);
    const filteredPedidos = pedidosUsers.filter(pedido =>
      (pedido.users.name && pedido.users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.users.lastname && pedido.users.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.users.email && pedido.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Suponiendo que pedido.id es un string, de lo contrario debes convertirlo a string
      pedido.id && pedido.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!startDate || new Date(pedido.created_at) >= new Date(startDate)) &&
      (!endDate || new Date(pedido.created_at) <= new Date(endDate))
    );
      console.log(filteredPedidos)
    setPedidosFiltrados(filteredPedidos);
};

  return (
    <div className="flex flex-col w-full sm:w-auto" >
         <Search onSearch={handleSearch} />
<div className='rounded border mt-2'>
             <div> <h1 className="text-3xl mt-4 font-black text-center"> Resultado de Ordenes </h1>
        </div>
        
        <div className="md:flex w-full md:justify-around p-10 sm:grid grid-cols-2">
        <h3 className="text-2xl">Filtrar por :</h3>
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
      pedidoAll={pedidosFiltrados} 


    />
  ))
) : (
  pedidosUsers.map(pedido => ( 
    <PedidosCardMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id}
      pedidoAll={pedidosUsers} 
  
    />
  ))
)}
  
    
  </div>
</div>
</div>
 </div>
        
  )
}

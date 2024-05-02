
import useSWR, { mutate } from 'swr';
import clienteAxios from "../config/axios";
import useAdmin    from "../hooks/useAdmin";
import PedidosCardMod from "../components/PedidosCardMod";
import Filtro from "../components/Filtro";
import Search from '../components/Search';
import { useEffect } from 'react';


export default function OrdersUsers() {
  const token = localStorage.getItem('AUTH_TOKEN')
   const {pedidosFiltrados,setPedidosFiltrados,handleSetPedidos,pedidos,handleFiltroChange} = useAdmin();

   
     const fetcher = () => clienteAxios('/api/adminPharmacies/orders',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/adminPharmacies/orders', fetcher,{ refreshInterval: 300000 })


  useEffect(() => {
     if (data) {
    handleFiltroChange("rojo",data.data);
    }
    // Initially set filteredPedidos to all pedidos
  }, [data, setPedidosFiltrados]); // Dependency array includes pedidosUsers to update on change

 const handleSearch = (searchData) => {
    const { searchTerm, startDate, endDate } = searchData;
   
    const filteredPedidos = pedidosUsers.filter(pedido =>
      (pedido.users.name && pedido.users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.users.lastname && pedido.users.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.users.email && pedido.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     
      pedido.id && pedido.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!startDate || new Date(pedido.created_at) >= new Date(startDate)) &&
      (!endDate || new Date(pedido.created_at) <= new Date(endDate))
    );
      
    setPedidosFiltrados(filteredPedidos);
};

  if (isLoading) return 'Cargando...';
  if (error) return 'Error al cargar datos.';
  return (
    <div className="flex flex-col w-full sm:w-auto" >
         <Search onSearch={handleSearch} title="Buscar Ordenes Usuarios" />
<div className='rounded border mt-2'>
             <div> <h1 className="text-3xl mt-4 font-black text-center">Ordenes de Usuarios </h1>
        </div>
        
        <div className="md:flex w-full md:justify-around p-10 sm:grid grid-cols-2">
        <h3 className="text-2xl">Filtrar por :</h3>
      <Filtro  pedidosUsers={data?.data || []}  />
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
  (data?.data || []).map(pedido => ( 
    <PedidosCardMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id}
      pedidoAll={data?.data} 
  
    />
  ))
)}
  
    
  </div>
</div>
</div>
 </div>
        
  )
}

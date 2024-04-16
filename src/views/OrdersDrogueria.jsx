import Search from "../components/Search";
import useSWR, { mutate } from 'swr';
import clienteAxios from "../config/axios";
import useAdmin    from "../hooks/useAdmin";
import PedidosCardDrogMod from "../components/PedidosCardDrogMod";


export default function OrdersDrogueria() {
 const {pedidosFiltrados,setPedidosFiltrados,handleSetPedidos,pedidos,} = useAdmin();
    const token = localStorage.getItem('AUTH_TOKEN')

    const title= "Buscar Ordenes Drogueria";
     const fetcher = () => clienteAxios('/api/adminPharmacies/ordersDrogueria',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/adminPharmacies/ordersDrogueria', fetcher,{ refreshInterval: 300000 })
  if(isLoading) return 'Cargando...';
    const pedidosUsers =data.data ;


   const handleSearch = (searchData) => {
    const { searchTerm, startDate, endDate } = searchData;
    console.log(pedidosUsers);
    const filteredPedidos = pedidosUsers.filter(pedido =>
      (pedido.orders.users.name && pedido.orders.users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.orders.users.lastname && pedido.orders.users.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.orders.users.email && pedido.orders.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.orders.id && pedido.orders.id.toString().toLowerCase().includes(searchTerm.toLowerCase())||
      pedido.id && pedido.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))&&
      (!startDate || new Date(pedido.created_at) >= new Date(startDate)) &&
      (!endDate || new Date(pedido.created_at) <= new Date(endDate))
    );
      
    setPedidosFiltrados(filteredPedidos);
};

   
  


  return (
  <div className="flex flex-col w-full sm:w-auto" >
         <Search 
         onSearch={handleSearch}
        title="Buscar Ordenes Drogueria"/>

        <div>

          filtro: 
          <ul>
            <li>Recibido</li>
             <li>A facturar</li>
              <li>Facturado</li>
               <li>A enviar</li>
               <li>Enviado</li>
                 <li>Anulado</li>
               <li></li>
          </ul>
        </div>
<div className='rounded border mt-2'>
             <div> <h1 className="text-3xl mt-4 font-black text-center"> Resultado de Ordenes drogueria </h1>
        </div>
        
        <div className="md:flex w-full md:justify-around p-10 sm:grid grid-cols-2">
       
     
      </div>

           
        <div className="w-full">
  <div className="flex flex-wrap justify-center">
  
   {pedidosFiltrados.length > 0 ? (
  pedidosFiltrados.map(pedido => ( 
    <PedidosCardDrogMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id} 
    />
  ))
) : (
  pedidosUsers.map(pedido => ( 
    <PedidosCardDrogMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id}
    />
  ))
)}
  </div>
</div>
       </div>
        </div>
  )
}

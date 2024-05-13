import Search from "../components/Search";
import useSWR, { mutate } from 'swr';
import clienteAxios from "../config/axios";
import useAdmin    from "../hooks/useAdmin";
import PedidosCardDrogMod from "../components/PedidosCardDrogMod";
import FiltroDrog from "../components/FiltroDrog";


export default function OrdersDrogueria() {
 const {pedidosDrogFiltrados,setPedidosDrogFiltrados,originalPedidosDrog, setOriginalPedidosDrog} = useAdmin();
    const token = localStorage.getItem('AUTH_TOKEN')
console.log(originalPedidosDrog);
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

    const filteredPedidos = pedidosUsers.filter(pedido =>
      (pedido.orders.users.name && pedido.orders.users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.orders.users.lastname && pedido.orders.users.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.orders.users.email && pedido.orders.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.orders.id && pedido.orders.id.toString().toLowerCase().includes(searchTerm.toLowerCase())||
      pedido.id && pedido.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))&&
      (!startDate || new Date(pedido.created_at) >= new Date(startDate)) &&
      (!endDate || new Date(pedido.created_at) <= new Date(endDate))
    );
      
    setPedidosDrogFiltrados(filteredPedidos);
};

   
  


  return (
  <div className="flex flex-col w-full sm:w-auto" >
         <Search 
         onSearch={handleSearch}
        title="Buscar Ordenes Drogueria"/>

        

        
       
<div className='rounded border mt-2'>
             <div> <h1 className="text-3xl mt-4 font-black text-center"> Resultado de Ordenes drogueria </h1>
        </div>
        
        <div className=" flex flex-col items-center md:flex w-full md:justify-around p-10 md:flex-row">

        <h3 className="text-2xl">Filtrar por :</h3>
      <FiltroDrog pedidosUsers={pedidosUsers} />

     
      </div>

           
        <div className="w-full">
  <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${ pedidosUsers.length > 0 && originalPedidosDrog.length > 0 ?'lg:grid-cols-3':'lg:grid-cols-1'}`}>
  
   {
   pedidosDrogFiltrados.length > 0 ? (
  pedidosDrogFiltrados.map(pedido => ( 
    <PedidosCardDrogMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id} 
    />
  ))
) : pedidosUsers.length > 0 && originalPedidosDrog.length > 0 ?(
  pedidosUsers.map(pedido => ( 
    <PedidosCardDrogMod
      key={pedido.id}
      pedidos={pedido}
      pedidoKey={pedido.id}
    />
  ))
): (

<div className="text-center text-gray-500 py-8 ">
  <h2 className="text-2xl font-semibold">Sin resultados</h2>
  <p className="mt-2 text-lg">No se encontraron pedidos que coincidan con la búsqueda.</p>
</div>

   )}
   
  </div>  
  </div>
</div>
       </div>

  )
}

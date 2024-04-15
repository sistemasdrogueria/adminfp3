import Search from "../components/Search";
import useSWR, { mutate } from 'swr';
import clienteAxios from "../config/axios";
import useAdmin    from "../hooks/useAdmin";

export default function OrdersDrogueria() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const title= "Buscar Ordenes Drogueria";
   const handleSearch = (searchData) => {
    const { searchTerm, startDate, endDate } = searchData;
    const fetcher = () => clienteAxios('/api/adminPharmacies/ordersDrogueria',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/adminPharmacies/ordersDrogueria', fetcher,{ refreshInterval: 300000 })
  if(isLoading) return 'Cargando...';
    const pedidosUsers =data.data ;
    console.log(pedidosUsers);
    /*
    const filteredPedidos = pedidosUsers.filter(pedido =>
      (pedido.users.name && pedido.users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.users.lastname && pedido.users.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.users.email && pedido.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Suponiendo que pedido.id es un string, de lo contrario debes convertirlo a string
      pedido.id && pedido.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!startDate || new Date(pedido.created_at) >= new Date(startDate)) &&
      (!endDate || new Date(pedido.created_at) <= new Date(endDate))
    );
      console.log(filteredPedidos)*/
   // setPedidosFiltrados(filteredPedidos);
};

  return (
  <div className="flex flex-col w-full sm:w-auto" >
         <Search 
         onSearch={handleSearch}
        title="Buscar Ordenes Drogueria"/>
<div className='rounded border mt-2'>
             <div> <h1 className="text-3xl mt-4 font-black text-center"> Resultado de Ordenes drogueria </h1>
        </div>
        
        <div className="md:flex w-full md:justify-around p-10 sm:grid grid-cols-2">
       
     
      </div>
       </div>
        </div>
  )
}

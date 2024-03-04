import {Link} from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import PedidosCard from '../components/PedidosCard';

export default function PedidosUsuarios() {

   const {} = useAdmin();
     const fetcher = () => clienteAxios('/api/pedidosAdmin').then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/pedidosAdmin', fetcher)
  if(isLoading) return 'Cargando...';
      const pedidosUsers =data.data ;
      console.log(data.data);
  return (
    <div>
      <h1 className="text-4xl font-black text-center">Pedidos Usuarios </h1>
        <p className="text-2xl my-10 text-center">filtro</p>
        <div className="w-full">
  <div className="flex flex-wrap justify-center">
    {pedidosUsers.map(pedidos => ( 
       <PedidosCard 
       key={pedidos.id}
       pedidos={pedidos}
       
       />) )}
  
    
  </div>
</div>
    </div>
  )
}

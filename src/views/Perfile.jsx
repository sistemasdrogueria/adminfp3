import React from 'react'
import AccordionPerfile from '../components/AccordionPerfile'
import clienteAxios from '../config/axios'
import useSWR from 'swr'




export default function Perfile() {

  const token = localStorage.getItem('AUTH_TOKEN')

     const fetcher = () => clienteAxios('/api/adminPharmacies/perfil',
{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/adminPharmacies/perfil', fetcher)
  if(isLoading) return 'Cargando...';
      const pharmacies =data.data ;
    
  return (
    <div className='flex flex-col bg-white p-5'>
     <div className='w-full border rounded-md p-3'>   
        <div className='text-center font-black ' >
 <h1 className="capitalize"> {pharmacies[0].name_pharmacies} ({pharmacies[0].code_ds})</h1>
        </div>
  
     </div>
     <AccordionPerfile pharmacies={pharmacies}/>
    </div>
  )
}

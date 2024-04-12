import React from 'react'
import AccordionPerfile from '../components/AccordionPerfile'

export default function Perfile() {
  return (
    <div className='flex flex-col bg-white p-5'>
     <div className='w-full border rounded-md p-3'>   
        <div className='text-center font-black ' >
 <h1> Nombre de la farmacia (código de drogueria)</h1>
        </div>
  
     </div>
     <AccordionPerfile />
    </div>
  )
}

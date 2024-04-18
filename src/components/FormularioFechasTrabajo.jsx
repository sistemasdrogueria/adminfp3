import React from 'react'
import TableSelecteShedule from './TableSelecteShedule'

export default function FormularioFechasTrabajo({pharmacies}) {
const schedules =pharmacies[0].pharmacies_schedules;
  return (
  
  <div className="container mx-auto ">
      
    <TableSelecteShedule schedules={schedules} cliente_id={pharmacies[0].clientes_id_ds}/>
    </div>
    
  )
}

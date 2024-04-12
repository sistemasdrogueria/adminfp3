import React, { useState } from 'react'
import AccordionItem from './AccordionItem'
import FormularioFarmacia from './FormularioFarmacia'
import FormularioFechasTrabajo from './FormularioFechasTrabajo'

export default function AccordionPerfile() {
  return (
    <div className="w-full mt-2 bg-white shadow-lg rounded-lg">
      <AccordionItem title="Editar Datos del Cliente">
       <FormularioFarmacia/>
      </AccordionItem>
      <AccordionItem title="Editar los Días de Trabajo de la Farmacia">
        <FormularioFechasTrabajo/>
      </AccordionItem>
      <AccordionItem title="Obras Sociales">
        <p>Administrar las obras sociales aceptadas.</p>
      </AccordionItem>
      <AccordionItem title="Métodos de Cobro">
        <p>Configurar los métodos de cobro disponibles.</p>
      </AccordionItem>


      
    </div>
  )
}

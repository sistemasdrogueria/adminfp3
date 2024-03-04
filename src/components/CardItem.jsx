export default function CardItem(items) {
  return (
      <div className="w-1/2 p-4">
        <div className="max-w-md mx-auto border bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="inline-flex flex-col">
            
    <div className="md:flex-shrink-0">
 <img src={`https://www.drogueriasur.com.ar/ds/img/productos/${items.items.articulo.imagen}`} alt={`Imagen producto ${items.items.articulo.descripcion_pag}`}  />
    </div> 
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"></div>
         <p className="mt-2 text-gray-500">{`Descripcion:${items.items.articulo.descripcion_pag}`}</p>
      <p className="mt-2 text-gray-500">Cantidad:{items.items.cantidad}</p>
      <p className="mt-2 text-gray-500">Precio: $ {items.items.precio_publico}</p>
      <div className="mt-4">
       
      </div>
    </div>  
    </div>
  </div>
</div>
  )
}

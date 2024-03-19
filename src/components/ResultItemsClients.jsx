import { formatearDinero } from "../helpers"

export default function ResultItemsClients({articulos}) {
  return (
    <div>
        <div className="p-2  flex items-center  justify-evenly  border shadow rounded-lg bg-white m-2">
      <div className="w-28 bg-white">
        <img
          src={`https://www.drogueriasur.com.ar/ds/img/productos/${articulos.articulo.imagen}`}
          alt={`Imagen producto ${articulos.articulo.descripcion_pag}`}
        />
      </div>
      <div className="flex flex-col w-72">
        <p className="font-black ">
            {articulos.articulo.descripcion_pag}</p>

        <p className="mt-2 text-gray-500">
        
               Precio con iva: $ {formatearDinero(articulos.precio_publico)}
               </p>
        <div className="flex gap-4 justify-center  items-end   w-36 ">
        <div className=" ">
          <p className="text-1xl"> 
          Cantidad : {articulos.cantidad}
          </p>
        
            </div>
    
        </div>
        
      </div>
    </div>
    </div>
  )
}

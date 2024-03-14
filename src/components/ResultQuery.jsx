
import { formatearDinero } from "../helpers";
export default function ResultQuery({articulo,articulo_id,handleAddProducto,users }) {

const cantidad = 1;
const{precio_publico, descripcion_pag,imagen,dcto,uni_min}= articulo;
const precioRedondeado = parseFloat(precio_publico).toFixed(2);
  const productoData = {
     precio_publico:precioRedondeado,
        cantidad,
        articulo_id,
    };

      const productoDataArt = {
        articulo:{
            'imagen':imagen,
             'descripcion_pag':descripcion_pag,
        },
        precio_publico,
        cantidad,
        articulo_id,
    };
  return (
    <>
    <div className="p-2  flex items-center border shadow rounded-lg bg-white m-2">
      <div className="w-28 bg-white">
        <img
          src={`https://www.drogueriasur.com.ar/ds/img/productos/${imagen}`}
          alt={`Imagen producto ${descripcion_pag}`}
        />
      </div>
      <div className="flex flex-col w-72">
        <p className="font-black ">
            {descripcion_pag}</p>

        <p className="mt-2 text-gray-500">
               {users?formatearDinero(precio_publico):formatearDinero(articulo.price)}
        
           </p>
             {!users && uni_min ?(
                   <p className="mt-2 text-gray-500">{uni_min}</p>
                    )
              : (
    // Este bloque se renderizará si la condición es falsa
    <p  className="mt-2"></p>
)}

                 {!users && dcto ?(
                   <p className="mt-2 text-red-500">{dcto} %</p>
                    )
              : (
    // Este bloque se renderizará si la condición es falsa
    <p  className="mt-2"></p>
)}
        
           
        <div className="flex gap-4 justify-center  items-center w-36 ">
       
          <div className="ms-2 ">
            <button
          type="button"
          onClick={()=> {
            //revisa argenis que aca deberia ir el id
            if(users){

    handleAddProducto(productoData,productoDataArt)
            }else{
              
              const productoDataArtMoreData = {
        articulo:{
            'imagen':articulo.imagen,
             'descripcion_pag':articulo.descripcion_pag,
             'dcto':articulo.dcto,
             'uni_min':articulo.uni_min,
              'price':articulo.price,
        },
        precio_publico,
        cantidad,
        articulo_id,
    };

    handleAddProducto(productoData,productoDataArtMoreData)

            }
           
          }}
                    className="bg-green-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        >
         Agregar 

        </button>
          </div>
          
          
        </div>
        
      </div>
    </div>
    </>
  )
}


import { formatearDinero } from "../helpers";
export default function ResultQuery({articulo,articulo_id,handleAddProducto,users }) {

const cantidad = 1;
const{precio_publico,price_pharmacies, descripcion_pag,imagen,dcto,uni_min}= articulo;


if(users){
var precioRedondeado = parseFloat(precio_publico).toFixed(2);

}else{

  var precioRedondeado = parseFloat(price_pharmacies).toFixed(2);

}

  const productoData = {
     precio_publico:parseFloat(precioRedondeado),
        cantidad,
        articulo_id,
    };

      
              const productoDataArtMoreData = {
        articulo:{
              'imagen':articulo.imagen,
              'descripcion_pag':articulo.descripcion_pag,
              'dcto':articulo.dcto,
                'price':articulo.price,
                'price_pharmacies':articulo.price_pharmacies,
                'combo_id':articulo.combo_id,
                'descuento_id':articulo.descuento_id,
                'plazoley_dcto':articulo.plazoley_dcto,
                'precio_publico':articulo.precio_publico,
                'tipo_fact':articulo.tipo_fact,
                'tipo_oferta':articulo.tipo_oferta,
                'tipo_oferta_elegida':articulo.tipo_oferta_elegida,
                'tipo_precio':articulo.tipo_precio,
                'iva':articulo.iva,
                'uni_min':articulo.uni_min,

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
               {users?formatearDinero(precio_publico):formatearDinero(price_pharmacies)}
        
           </p>
             {!users && uni_min ?(
                   <p className="mt-2 text-gray-500">Unidades min: {uni_min}</p>
                    )
              : (
    // Este bloque se renderizará si la condición es falsa
    <p  className="mt-2"></p>
)}

                 {!users && dcto ?(
                   <p className="mt-2 text-red-500">Descuento: {dcto} %</p>
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
    handleAddProducto(productoData,productoDataArtMoreData)
          
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

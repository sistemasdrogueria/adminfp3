import { useEffect, useState } from "react";
import { formatearDinero } from "../helpers";
import { validateNum } from "../helpers/validateNum";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function CardFarmItem({ items,pedidoid, handleDeleteItem,originalItems,users, precioPublicoOr}) {


  //const  precio_publico_original= validateNum(precioPublicoOr);
  const  precio_publico_original= precioPublicoOr;
    const [ cantidad,setCantidad ] = useState(items.cantidad)
    const precio = precio_publico_original/items.cantidad;
     const [ total,setTotal ] = useState(precio)
     const [originalItemsTemp, setOriginalsItemsTemp] = useState(originalItems);
      const {handleDeleteProductOrders,articulos,handleSetPedidosUsersMod,itemsMod,setItemsMod,setArticulos} = useAdmin();


       const handleIncrement = () => {
    handleQuantityChange(cantidad + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      handleQuantityChange(cantidad - 1)
    }
  };

      useEffect(() => {
        if(users){

    setTotal(precio * cantidad);
        }else{

       setTotal(items.articulo.price * cantidad);
      
        }

  }, [cantidad, items.precio_publico,items]);

  
      useEffect(() => {
    setOriginalsItemsTemp(originalItems);
  }, [originalItemsTemp]);

 const handleQuantityChange = (newQuantity) => {
    // Update the local state
    setCantidad(newQuantity);
    
    // Pass the modified item to the parent component

    handleModifyPedido(items.articulo_id, newQuantity);
  };


  const handleModifyPedido = (articulo_id, newQuantity) => {
    // Find the item in the pedido array and update its quantity
    const updatedPedido = articulos.map((item) =>
      item.articulo_id === articulo_id ? {...item, cantidad: newQuantity, precio_publico: (precio*newQuantity).toFixed(2)} : item);
    // Update the state with the modified pedido

    handleSetPedidosUsersMod(updatedPedido);
    setArticulos(updatedPedido);

  };

const handleDeleteProduct = (articulo_id) => {
        // Mostrar la alerta de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
           
    const itemsActualizado = itemsMod.filter((producto) => producto.articulo_id !== articulo_id);
    if(users){ 
   handleDeleteItem(articulo_id)
   setItemsMod(itemsActualizado)
   handleDeleteProductOrders(pedidoid,itemsActualizado) 
            }else{
   handleDeleteItem(articulo_id);
   setItemsMod(itemsActualizado);
  
   }
  
            }
        });
    };
  return (
    <div className="p-2  flex items-center  justify-evenly  border shadow rounded-lg bg-white m-2">
      <div className="w-28 bg-white">
        <img
          src={`https://www.drogueriasur.com.ar/ds/img/productos/${items.articulo.imagen}`}
          alt={`Imagen producto ${items.articulo.descripcion_pag}`}
        />
      </div>
      <div className="flex flex-col w-72">
        <p className="font-black ">
            {items.articulo.descripcion_pag}</p>

        <p className="mt-2 text-gray-500">
         {users ? formatearDinero(total)
               :formatearDinero(total)}
               </p>
                {
                !users && items.articulo.dcto && (
                   <p className="mt-2 text-red-500">{items.articulo.dcto}%</p>
                    )
              }
        
          
          {
                !users && items.articulo.dcto && (
                  <p className={`mt-3 mb-3 text-black font-bold rounded text-center ov ${
                    cantidad < items.articulo.uni_min ? 'bg-orange-300' : 'bg-green-300'
                  }`}>
                    {
                      cantidad < items.articulo.uni_min
                        ? "Oferta perdida"
                        : cantidad >= items.articulo.uni_min
                        ? "Oferta adquirida"
                        : ''
                    }
                  </p>
                )
              }
        <div className="flex gap-4 justify-center  items-end   w-36 ">
            <div className="flex gap-4 justify-center  w-36 mt-2 border rounded-md shad">
          <button type="button"
          onClick={handleDecrement}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <p className="text-3xl"> 
          {cantidad}</p>
          <button type="button"
           onClick={handleIncrement}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
            </div>
          <div className="ms-2 ">
            <button
          type="button"
          onClick={()=> {
            handleDeleteProduct(items.articulo_id)
          }}
                    className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
          </div>
          
          
        </div>
        
      </div>
    </div>
  );
}

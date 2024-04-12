import {useState, useEffect} from "react";
import useAdmin from "../hooks/useAdmin"
import clienteAxios from "../config/axios";
import CardFarmItem from "./CardFarmItem";
import ResultQuery from "./ResultQuery";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ModalOrdersMod() {
     const {
    handleClickModalOrderMod,
    pedidosUsersView,
    idsArticulosInOrders,
    articulos,setArticulos,
   pedidosUsersMod,handleSetPedidosUsersMod,
   handleAddProductoPedido,
   itemsMod,
   setItemsMod,
   handleClickSavePedido,
   inputCheckbox,
   handleClickChangeCheckbox,
   handleClickCancelPedido,
   handleClickEstadoPedido,
   handleSetNewTime,
   HandleSetTimeChanged, 
   HandleSetIdPedidoTimeChanged,

  } = useAdmin();



  const [solicitudEnviada, setSolicitudEnviada,] = useState(false); // Estado para controlar si la solicitud ya ha sido enviada
  const item = JSON.parse(pedidosUsersView.items);
  const time = pedidosUsersView.time;
  const [timet, setItemt] = useState(time);
  const [items,setItems] = useState(item);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); 
  const [elapsedTime, setElapsedTime] = useState(timet); // Tiempo transcurrido en segundos
  const [timer, setTimer] = useState(null); 

 const handleCancel = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres cancelar este pedido?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar pedido'
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes ejecutar la acción de cancelar el pedido
                // Por ejemplo, puedes llamar a una función cancelarPedido()
                handleClickCancelPedido();
                   clearInterval(timer);
            }
        });
    };


useEffect(() => {
  async function enviarSolicitud() {
    try {
      const ids = { ids: idsArticulosInOrders };
      const token = localStorage.getItem('AUTH_TOKEN')
     const respuesta = await clienteAxios.post("api/articulosAdmin", ids, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filtrar los elementos de items que coinciden con los IDs de la respuesta
      const articulosFiltrados = items.filter((pedidoItem) =>
        respuesta.data.data.some((item) => item.id === pedidoItem.articulo_id)
      );

      // Crear una nueva lista de artículos con la información actualizada
      const articulosActualizados = articulosFiltrados.map((pedidoItem) => {
        const articulo = respuesta.data.data.find((item) => item.id === pedidoItem.articulo_id);
        return { ...pedidoItem, articulo };
      });

      // Establecer los artículos actualizados
      setArticulos(articulosActualizados);
      setItemsMod(JSON.parse(pedidosUsersView.items));
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }

  // Verificar si la solicitud ya ha sido enviada antes de enviarla nuevamente
  if (!solicitudEnviada) {
    enviarSolicitud();
    setSolicitudEnviada(true); // Marcar la solicitud como enviada
  }
}, [idsArticulosInOrders, solicitudEnviada]);


const handleDeleteItem = (articulo_id) => {
    // Filtra los elementos para eliminar el que coincida con el articulo_id
    const pedidoActualizado = articulos.filter((producto) => producto.articulo_id !== articulo_id);
  const ItemsActualizado = itemsMod.filter((producto) => producto.articulo_id !== articulo_id);
    setArticulos(pedidoActualizado);
    setItemsMod(ItemsActualizado)
};
 const updateState = () => {
  handleClickEstadoPedido(15,0,true);
  };
  
const handleAddProducto = (productoData,productoDataArt )=> {

 if (articulos.some((articulosState) => articulosState.articulo_id === productoDataArt.articulo_id)) {

toast.success("El producto ya fué agregado.")

 }else{
  
setItemsMod([...itemsMod,productoData])
setItems([...items,productoData])
setArticulos([...articulos,productoDataArt])
handleAddProductoPedido(pedidosUsersView.id, [...itemsMod, productoData]);
 }

 // handleAddProductoPedido(pedidoid,itemsActualizado);
}

  const handleSearch = async () => {
        try { 
            const token = localStorage.getItem('AUTH_TOKEN')

            const response = await clienteAxios.post('/api/adminPharmacies/search',{query},
{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
            setResults(response.data.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
  };


  useEffect(() => {
    // Inicia el temporizador
    const newTimer = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      handleSetNewTime((prevElapsedTime) => prevElapsedTime + 1);
      HandleSetTimeChanged(true);
      HandleSetIdPedidoTimeChanged(pedidosUsersView.id);
    }, 1000); // Intervalo de 1 segundo
     
    // Inicia la alerta cuando hayan pasado los 5 minutos
    if (!timer && elapsedTime === 0) {
      setTimer(newTimer); // Guarda la referencia al temporizador
      Swal.fire({
        title: "¡Alerta!",
        text: "¡Tienes 5 minutos para confirmar el pedido!",
        icon: "warning",
        timer: 6000, // 5 minutos en milisegundos
        timerProgressBar: true,
        showConfirmButton: false,
        
        
      });
    }
          if(elapsedTime >= 500){
          handleClickModalOrderMod(); 
          HandleSetTimeChanged(false);
          HandleSetIdPedidoTimeChanged(null);
          handleSetNewTime(0);
          updateState(); //
          
          return () => clearInterval(newTimer);
           }

    // Limpia el temporizador cuando el componente se desmonta o se cierra el modal
    return () => clearInterval(newTimer);
  }, [elapsedTime, timer]);

   const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };


const handleButtonClick = () => {
  handleClickModalOrderMod();
  handleClickEstadoPedido(8,elapsedTime,false);
};
  return (
    <div>
    <div className="md:w-full  ">
    <div className="flex justify-end">
      <button onClick={handleButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
     <div className="w-full md:flex sm:flex-col lg:flex-row">
    
      <div className="w-full md:w-4/6 lg:w-4/6 bg-gray-100 border">
<div className="flex align-middle w-full justify-center">
        
<p className="font-bold">Tiempo transcurrido: </p>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg><p className="font-bold">{formatTime(elapsedTime)}</p>
      </div>
<div className="w-full mx-auto">   
<div className="bg-white flex flex-col  items-center align-middle sm:p-0 md:p-14  ">
  <h1 className="text-2xl font-black  text-center mb-3 ">Buscar un producto</h1>
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative sm:w-80 sm:flex md:w-96">
        <div className="absolute md:inset-y-0 start-0 flex items-center ps-3 pointer-events-none sm:absolute sm:top-15">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
             fill="none"
              viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input 
        type="search"
         value={query}  
         id="default-search" 
         onChange={(e) => setQuery(e.target.value)}
         className="block w-full p-4 mb-2  ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Buscar Productos ..." required />
        <button onClick={handleSearch} type="submit" className="text-white mt-3 mb-3 md:absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full md:w-20">Buscar</button>
    </div>
</div>
    
    <div className="container overflow-y-scroll" style={{ maxHeight: '600px',maxWidth: '600px', margin: '0 auto' }}>
     {results.map((result) => (
            <ResultQuery key={result.id} articulo={result} articulo_id={result.id} handleAddProducto={handleAddProducto}users={true} />
          ))}
   
    </div>
</div>

      </div>
       <div  className="sm:w-full md:w-1/3  bg-gray-100 border  overflow-y-scroll">
        <div className="bg-white ">
          <h3 className="text-2xl font-black  text-center">Carrito Cliente #{pedidosUsersView.id}</h3>
             <p className="ms-4 flex p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>Nombre : {pedidosUsersView.users.name}</p>
             <p className="ms-4 flex p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg><a className="ms-3" href={`mailto:${pedidosUsersView.users.email}`}>{pedidosUsersView.users.email}</a></p>
              <p className="ms-4 flex p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>
Telefono: <a href={`tel:${pedidosUsersView.users.cellphone}`}>{pedidosUsersView.users.cellphone}</a></p>
          
        </div>

         <div className=" justify-center  ">
          {articulos.map((pedidoItem) => (
            <CardFarmItem key={pedidoItem.articulo_id} items={pedidoItem} pedidoid={pedidosUsersView.id}handleDeleteItem={handleDeleteItem} originalItems={JSON.parse(pedidosUsersView.items)} users={true} precioPublicoOr={pedidoItem.precio_publico}/>
          ))}
        </div>
       
      </div>



     </div>

    </div>
     <p className="font-black text-md mt-1 text-center"> Precios con iva.</p>
    <div className="flex flex-col justify-between md:flex-row md:justify-center md:w-full  mt-10">
       <div className=" flex m-4 focus:outline-none text-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"> 
  <label className="me-3" htmlFor="sendall"> Pedí lo mismo a Drogueria</label>
  < input type="checkbox" onChange={handleClickChangeCheckbox} defaultChecked ={inputCheckbox} id="sendall" />
  </div>
<button onClick={handleClickSavePedido}type="button" className="sm:w-full md:w-64 m-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Confirmar Pedido Usuario</button>

<button onClick={handleCancel}         type="button" className="sm:w-full md:w-64 m-4  focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar Pedidos</button>

    </div>
    </div>
  )
}

import { createContext, useState, useEffect, useLocation } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";
import { mutate } from 'swr';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [farmacias, setFarmacias] = useState([]);
  const [usersEdit, setUsersEdit] = useState([]);
  const [activeLink, setActiveLink] = useState(`${window.location.pathname}`);
  const [farmaciasEdit, setFarmaciasEdit] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalFarmacias, setmodalFarmacias] = useState(false);
  const [modalPedidosUsers, setModalPedidosUsers] = useState(false);
  const [modalOrdersMod, setModalOrdersMod] = useState(false);
  const [modalOrdersDrogMod, setModalOrdersDrogMod] = useState(false);
  const [modalOrdersDetails, setModalOrdersDetails] = useState(false);
  const [modalOrdersDrogDetails, setModalOrdersDrogDetails] = useState(false);
  const [pedidosUsersMod, setPedidosUsersMod] = useState([]);
  const [pedidosUsersView, setPedidosUsersView] = useState([]);
  const [pedidosDrogView, setPedidosDrogView] = useState([]);
  const [originalPedidosUsers, setOriginalPedidosUsers]= useState([]);
  const [originalPedidosDrog, setOriginalPedidosDrog]= useState([]);
  const [idsArticulosInOrders, setIdsArticulosInOrders] = useState([]);
  const [idsArticulosDrogInOrders, setIdsArticulosDrogInOrders] = useState([]);
  const [itemsUsers, setItemsUsers] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosDrog, setArticulosDrog] = useState([]);
  const [itemsMod, setItemsMod] = useState([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [pedidosDrogFiltrados, setPedidosDrogFiltrados] = useState([]);
  const [color, setColor] = useState("rojo");
  const [estado, setEstado] = useState(1);
  const [inputCheckbox, setInputCheckbox] = useState(false);
  const [newTime, setNewTime]= useState(0);
  const [timeChanged,setTimeChanged] = useState(false);
  const [idPedidoTimeChanged,setIdPedidoTimeChanged] = useState([]);


  const handleFiltroChange = (color, pedidosUsers) => {
    let filtrados = [];
    // Aplicar el filtro
    switch (color) {
      case "rojo":
        setPedidosFiltrados(
          filtrados =pedidosUsers.filter((pedido) => pedido.estado_id === 8  ||pedido.estado_id === 15)
        );
        break;
      case "verde":
        setPedidosFiltrados(
          filtrados =pedidosUsers.filter((pedido) => pedido.estado_id === 2 || pedido.estado_id === 10)
        );
        break;
      case "naranja":
        setPedidosFiltrados(
         filtrados = pedidosUsers.filter((pedido) => pedido.estado_id === 1)
        );
        break;
      case "indigo":
        setPedidosFiltrados(
          filtrados =pedidosUsers.filter((pedido) => pedido.estado_id === 12)
        );
       break;
         case "blanco":

          filtrados =pedidosUsers;

        break;
      default:
   
    }

 if (filtrados.length === 0) {
    // Establecer un mensaje o un array vacío en caso de que no haya resultados
    setPedidosFiltrados([]);
    setOriginalPedidosUsers([]);
  } else {
    // Establecer los resultados filtrados
    setOriginalPedidosUsers(filtrados);
    setPedidosFiltrados(filtrados);
  }

  };
  const handleDrogFiltroChange = (estado, pedidosUsers) => {
  let filtrados = [];

  // Aplicar el filtro
  switch (estado) {
    case 1:
      filtrados = pedidosUsers.filter((pedido) => pedido.estado_id === 1);
      break;
    case 2:
      filtrados = pedidosUsers.filter((pedido) => pedido.estado_id === 2);
      break;
    case 3:
      filtrados = pedidosUsers.filter((pedido) => pedido.estado_id === 3);
      break;
    case 4:
      filtrados = pedidosUsers.filter((pedido) => pedido.estado_id === 4);
      break;
    case 5:
      filtrados = pedidosUsers.filter((pedido) => pedido.estado_id === 5);
      break;
    case 6:
      filtrados = pedidosUsers.filter((pedido) => pedido.estado_id === 6);
      break;
    default:
      filtrados = pedidosUsers;
  }


  // Verificar si hay resultados después de aplicar el filtro
  if (filtrados.length === 0) {
    // Establecer un mensaje o un array vacío en caso de que no haya resultados
    setPedidosDrogFiltrados([]);
    setOriginalPedidosDrog([]);
  } else {
    // Establecer los resultados filtrados
    setPedidosDrogFiltrados(filtrados);
    setOriginalPedidosDrog(filtrados);
  }
};

  const handleClickChangeCheckbox = () => {
    setInputCheckbox(!inputCheckbox);
  };

  const handleClickModal = () => {
    setModal(!modal);
  };

  const handleClickModalFarmacias = () => {
    setmodalFarmacias(!modalFarmacias);
  };

  const handleClickModalPedidosUsers = () => {
    setModalPedidosUsers(!modalPedidosUsers);
  };
  const handleClickModalOrderMod = () => {
    setModalOrdersMod(!modalOrdersMod);
  };
  const handleClickModalOrderDrogMod = () => {
    setModalOrdersDrogMod(!modalOrdersDrogMod);
  };

  const handleClickModalOrdersDetails = () => {
    setModalOrdersDetails(!modalOrdersDetails);
  };

  
  
  const handleClickModalOrdersDrogDetails = () => {
    setModalOrdersDrogDetails(!modalOrdersDrogDetails);
  };
  const handleSetPedidosUsers = (pedidosUsersView) => {
    setPedidosUsersView(pedidosUsersView);
  };

    const handleSetPedidosDrogView = (pedidosDrogView) => {
    setPedidosDrogView(pedidosDrogView);
  };

  const handleSetPedidosUsersMod = (pedidosUsersMod) => {
    setPedidosUsersMod(pedidosUsersMod);
  };

  const handleSetArticulos = (articulos) => {
    setArticulos(articulos);
  };

  const handleSetArticulosDrog = (articulos) => {
    setArticulosDrog(articulos);
  };
  const handleSetUser = (usersEdit) => {
    setUsersEdit(usersEdit);
  };

  const handleSetFarmacias = (farmaciasEdit) => {
    setFarmaciasEdit(farmaciasEdit);
  };
  const handleDeleteUser = (id) => {
    deleteUser(id);
    // Actualizar la interfaz de usuario si es necesario
  };

    const HandleSetTimeChanged = (time) => {
    setTimeChanged(time);
  };

    const HandleSetIdPedidoTimeChanged = (id) => {
    setIdPedidoTimeChanged(id);
  };

  const handleSetItemsUsers = (itemsUsers) => {
    setItemsUsers(itemsUsers);
  };

  const handleSetArticulosInOrders = (idsArticulosInOrders) => {
    const ids = JSON.parse(idsArticulosInOrders).map(
      (item) => item.articulo_id
    );
    setIdsArticulosInOrders(ids);
  };

  const handleSetArticulosDrogInOrders = (idsArticulosDrogInOrders) => {
    const ids = JSON.parse(idsArticulosDrogInOrders).map(
      (item) => item.articulo_id
    );
    setIdsArticulosDrogInOrders(ids);
  };

  const handleSetNewTime= (newTime) => {
    setNewTime(newTime);
  };

 const handleChangeIdPharmacies = async (id)=> {

   try {
      const token = localStorage.getItem("AUTH_TOKEN");

      const response = await clienteAxios.put(
        `/api/adminPharmacies/orders/saveIdPharmacies/${id}`,
        { id,estado_id:8 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate('/api/adminPharmacies/orders');
      mutate('/api/adminPharmacies/ordersDrogueria');

      toast.success("Has tomado este pedido.");
      handleClickModalOrderMod();

    } catch (error) {
      console.error("Error fetching search results:", error);
    }
 }
  const handleDeleteProductOrders = async (id, items) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const respuesta = await clienteAxios.post(
        "/api/adminPharmacies/orders/deleteitem",
        { id, items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Eliminado del pedido");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const HandlesetItemsMod = (itemsMod) => {
    setItemsMod(itemsMod);
  };

  const handleAddProductoPedido = async (id, items) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const respuesta = await clienteAxios.put(
        `/api/adminPharmacies/orders/additem/${id}`,
        { id, items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Producto agregado al pedido");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const handleClickSavePedido = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const id = pedidosUsersView.id;
      const response = await clienteAxios.put(
        `/api/adminPharmacies/orders/save/${pedidosUsersView.id}`,
        { id, estado_id: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Pedido usuario aceptado correctamente.");
      handleClickModalOrderMod(!modalOrdersMod);
 
      if (inputCheckbox) {
       // handleClickSavePedidoDrog();
        handleClickModalOrderDrogMod();
      } else {
        handleClickCancelPedidoDrog();
             mutate('/api/adminPharmacies/orders');
             mutate('/api/adminPharmacies/ordersDrogueria');
  
        //handleClickModalOrderDrogMod();
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };



  const handleClickSavePedidoDrog = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const id = pedidosUsersView.id;
      const response = await clienteAxios.post(
        "/api/adminPharmacies/ordersDrogueria/save",
        {
          id,
          articulos: articulos,
          cantitems: articulos.length,
          cliente_id: pedidosUsersView.pharmacies_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!inputCheckbox) {
       // handleClickModalOrderDrogMod();
      }
       mutate('/api/adminPharmacies/orders');
       mutate('/api/adminPharmacies/ordersDrogueria');
      toast.success("Pedido solicitado a Drogueria. ");
      handleClickModalOrderDrogMod();
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };


    const handleClickCancelPedidoDrog = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const id = pedidosUsersView.id;
      
      const response = await clienteAxios.post(
        "/api/adminPharmacies/ordersDrogueria/cancel",
        {
          id,
          cliente_id: pedidosUsersView.pharmacies_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (inputCheckbox) {
        handleClickModalOrderDrogMod();
      }

      toast.success("Pedido cancelado a Drogueria. ");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const handleClickCancelPedido = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const id = pedidosUsersView.id;
      const response = await clienteAxios.put(
        `/api/adminPharmacies/orders/save/${pedidosUsersView.id}`,
        { id, estado_id: 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClickModalOrderMod();

      toast.success("Pedido Cancelado. ");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };


 const updatePedidoTime = (pedidoId, nuevoTiempo,pedidosUsers) => {

    const pedidosActualizados = pedidosUsers.map(pedido => {
      if (pedido.id === pedidoId) {
        return { ...pedido, time: nuevoTiempo };
      }
      return pedido;
    });
setPedidosFiltrados(pedidosActualizados);
  
  };
   
  const handleClickEstadoPedido = async (estado, time, valor) => {
       if (valor) {
 var pharmaciesid= null;
 var varold_pharmacies_id= pedidosUsersView.pharmacies_id;
       }else{
 var pharmaciesid= pedidosUsersView.pharmacies_id;
 var varold_pharmacies_id= null;
       }
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const id = pedidosUsersView.id;
      const response = await clienteAxios.put(
        `/api/adminPharmacies/orders/save/${pedidosUsersView.id}`,
        { id, estado_id: estado, time: time,pharmacies_id:pharmaciesid,old_pharmacies_id:varold_pharmacies_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );  
      mutate('/api/adminPharmacies/orders');
      handleClickModalOrderMod();
    

      if (valor) {
        toast.warning("El Pedido ha sido Removido por no cumplir con tiempo requerido. ");
      } else {
 
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        users,
        farmacias,
        activeLink,
        modal,
        handleClickModal,
        usersEdit,
        handleSetUser,
        modalFarmacias,
        handleClickModalFarmacias,
        farmaciasEdit,
        handleSetFarmacias,
        setActiveLink,
        setUsers,
        setFarmacias,
        handleClickModalPedidosUsers,
        modalPedidosUsers,
        handleSetPedidosUsers,
        handleSetPedidosDrogView,
        pedidosDrogView,
        setPedidosUsersView,
        pedidosUsersView,
        idsArticulosInOrders,
        handleSetArticulosInOrders,
        modalOrdersMod,
        handleClickModalOrderMod,
        modalOrdersDrogMod,
        handleClickModalOrderDrogMod,
        handleDeleteProductOrders,
        itemsUsers,
        setItemsUsers,
        handleSetItemsUsers,
        articulos,
        setArticulos,
        setPedidosUsersMod,
        pedidosUsersMod,
        handleSetPedidosUsersMod,
        handleSetArticulos,
        handleAddProductoPedido,
        itemsMod,
        setItemsMod,
        HandlesetItemsMod,
        handleClickSavePedido,
        handleClickSavePedidoDrog,
        pedidosFiltrados,
        setPedidosFiltrados,
        pedidosDrogFiltrados,
        setPedidosDrogFiltrados,
        handleFiltroChange,
        handleDrogFiltroChange,
        estado,
        setEstado,
        color,
        setColor,
        inputCheckbox,
        setInputCheckbox,
        handleClickChangeCheckbox,
        handleClickCancelPedido,
        handleClickModalOrdersDetails,
        handleClickModalOrdersDrogDetails,
        handleClickCancelPedidoDrog,
        modalOrdersDetails,
        modalOrdersDrogDetails,
        setModalOrdersDetails,
        handleSetArticulosDrogInOrders,
        setIdsArticulosDrogInOrders,
        idsArticulosDrogInOrders,
        handleSetArticulosDrog,
        setArticulosDrog,
        articulosDrog,
        handleClickEstadoPedido,
        timeChanged,
        HandleSetTimeChanged,
        idPedidoTimeChanged,
        HandleSetIdPedidoTimeChanged,
        newTime,
        setNewTime,
        handleSetNewTime,
        originalPedidosUsers,
        setOriginalPedidosUsers,
        originalPedidosDrog,
        setOriginalPedidosDrog,
        handleChangeIdPharmacies
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
export { AdminProvider };

export default AdminContext;

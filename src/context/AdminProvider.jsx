import { createContext, useState, useEffect, useLocation } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";

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
  const [modalOrdersDrogMod,setModalOrdersDrogMod]= useState(false);
  const [modalOrdersDetails,setModalOrdersDetails]= useState(false);
  const [pedidosUsersMod, setPedidosUsersMod] = useState([]);
  const [pedidosUsersView, setPedidosUserView] = useState([]);
  const [idsArticulosInOrders, setIdsArticulosInOrders] = useState([]);
  const [idsArticulosDrogInOrders, setIdsArticulosDrogInOrders] = useState([]);
  const [itemsUsers, setItemsUsers] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosDrog, setArticulosDrog] = useState([]);
  const [itemsMod, setItemsMod] = useState([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [color, setColor] = useState('rojo');
  const [inputCheckbox, setInputCheckbox]= useState(false);
  
  const handleFiltroChange = (color,pedidosUsers) => {
    // Aplicar el filtro
    switch (color) {
      case 'rojo':
        setPedidosFiltrados(pedidosUsers.filter(pedido => pedido.estado_id === 8));
        break;
      case 'verde':
        setPedidosFiltrados(pedidosUsers.filter(pedido => pedido.estado_id === 2));
        break;
      case 'naranja':
        setPedidosFiltrados(pedidosUsers.filter(pedido => pedido.estado_id === 1));
        break;
      case 'indigo':
        setPedidosFiltrados(pedidosUsers.filter(pedido => pedido.estado_id === 0));
        break;
      default:
        setPedidosFiltrados(pedidosUsers);
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
  const handleClickModalOrderDrogMod= () => {

    setModalOrdersDrogMod(!modalOrdersDrogMod)
  }
  
  const handleClickModalOrdersDetails = () => {
    setModalOrdersDetails(!modalOrdersDetails);
  };
  const handleSetPedidosUsers = (pedidosUsersView) => {
    setPedidosUserView(pedidosUsersView);
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
;
  };


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
        { id,estado_id:1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

        toast.success('Pedido usuario aceptado correctamente.')
        handleClickModalOrderMod(!modalOrdersMod)
        
       
      if(inputCheckbox){

      handleClickSavePedidoDrog()

      }else{

        handleClickModalOrderDrogMod();
      }
              
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

    const handleClickSavePedidoDrog = async () => {

    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const id = pedidosUsersView.id;
      const response = await clienteAxios.post('/api/adminPharmacies/ordersDrogueria/save',
        { 
          id,
        articulos:articulos,
        cantitems:articulos.length,
        cliente_id:pedidosUsersView.pharmacies_id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
               
      if(!inputCheckbox){
    handleClickModalOrderDrogMod();
      }

      toast.success("Pedido solicitado a Drogueria. ");
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
        { id,
        estado_id:0 },
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
        setPedidosUserView,
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
        handleFiltroChange,
        color,
        setColor,
        inputCheckbox,
        setInputCheckbox,
        handleClickChangeCheckbox,
        handleClickCancelPedido,
        handleClickModalOrdersDetails,
        modalOrdersDetails,
        setModalOrdersDetails,
        handleSetArticulosDrogInOrders,
        setIdsArticulosDrogInOrders,
        idsArticulosDrogInOrders,
        handleSetArticulosDrog,
        setArticulosDrog,
        articulosDrog,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
export { AdminProvider };

export default AdminContext;

import { createContext, useState, useEffect, useLocation } from "react"
import { toast } from "react-toastify";
import clienteAxios from '../config/axios';


const AdminContext = createContext();

const AdminProvider = ({children}) => { 


const [users, setUsers] = useState([]);
const [farmacias, setFarmacias] = useState([]);
const [usersEdit, setUsersEdit] = useState([]);
const [activeLink, setActiveLink] = useState(`${window.location.pathname}`);
const [farmaciasEdit,setFarmaciasEdit] = useState([]);
const [modal, setModal] = useState(false);
const [modalFarmacias, setmodalFarmacias] = useState(false);
const [modalPedidosUsers, setModalPedidosUsers] = useState(false);
const [pedidosUsers, setPedidosUsers] = useState([]);
const [pedidosUsersView,setPedidosUserView] = useState([]);
const [idsArticulosInOrders, setIdsArticulosInOrders] = useState([]);


const handleClickModal = () => {

setModal(!modal)

}

const handleClickModalFarmacias = () => {

setmodalFarmacias(!modalFarmacias)

}

const handleClickModalPedidosUsers= () => {
  setModalPedidosUsers(!modalPedidosUsers)


}
const handleSetPedidosUsers= pedidosUsersView => {

  setPedidosUserView(pedidosUsersView)
}

const handleSetUser = usersEdit => {
setUsersEdit(usersEdit)

}


const handleSetFarmacias = farmaciasEdit => {
setFarmaciasEdit(farmaciasEdit)

}
const handleDeleteUser = (id) => {
  deleteUser(id);
  // Actualizar la interfaz de usuario si es necesario
}
 const handleSetArticulosInOrders= idsArticulosInOrders=> {
  const ids =JSON.parse(idsArticulosInOrders).map(item => item.articulo_id);
  setIdsArticulosInOrders(ids)

 }
 

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
    handleSetArticulosInOrders
    

}}
>{children}</AdminContext.Provider>

)

}
export{ AdminProvider}

export default AdminContext
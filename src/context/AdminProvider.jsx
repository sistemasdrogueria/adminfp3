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


const handleClickModal = () => {

setModal(!modal)

}

const handleClickModalFarmacias = () => {

setmodalFarmacias(!modalFarmacias)

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
    setFarmacias
}}
>{children}</AdminContext.Provider>

)

}
export{ AdminProvider}

export default AdminContext
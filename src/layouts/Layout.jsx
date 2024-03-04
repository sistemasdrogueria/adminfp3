import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import useAdmin from "../hooks/useAdmin";
import ModalUsers from "../components/ModalUsers";
import ModalFarmacias from "../components/ModalFarmacias";
import ModalPedidos from "../components/ModalPedidos";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";

const customStyles = {
   content: {
    position: 'absolute',
    inset: '50% auto auto 50%',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#root');
export default function Layout() {
    const{modal,handleClickModal,modalFarmacias,modalPedidosUsers} = useAdmin();
    const{user,error } = useAuth({middleware:'auth'});
  return (
    <>
    <div className="md:flex ">
      
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>
    </div>
   
        <Modal isOpen={modal ? modal : (modalFarmacias || modalPedidosUsers)} >
  {modal ? <ModalUsers /> : (modalFarmacias ? <ModalFarmacias /> : <ModalPedidos />)}
</Modal>
        <ToastContainer/>

    </>
  );
}

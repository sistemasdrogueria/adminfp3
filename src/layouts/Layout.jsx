import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import useAdmin from "../hooks/useAdmin";
import ModalUsers from "../components/ModalUsers";
import ModalFarmacias from "../components/ModalFarmacias";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}
Modal.setAppElement('#root');
export default function Layout() {
    const{modal,handleClickModal,modalFarmacias} = useAdmin();
    const{user,error } = useAuth({middleware:'auth'});
  return (
    <>
    <div className="md:flex ">
      
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>
    </div>
   
        <Modal isOpen={modal ?modal : modalFarmacias} style={customStyles}> 
        {modal ? <ModalUsers/> :  <ModalFarmacias />}

        </Modal>
        <ToastContainer/>

    </>
  );
}

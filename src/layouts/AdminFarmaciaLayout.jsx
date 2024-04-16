import {Outlet, useNavigate}from 'react-router-dom'
import SidebarFarmacia from "../components/SidebarFarmacia";
import { useAuth } from '../hooks/useAuth';
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import useAdmin from '../hooks/useAdmin';
import ModalOrdersMod from '../components/ModalOrdersMod';
import ModalOrdersDrogMod from '../components/ModalOrdersDrogMod';
import { useEffect } from "react";
import ModalOrdersDetails from '../components/ModalOrdersDetails';
import ModalOrdersDrogDetails from '../components/ModalOrdersDrogDetails';
export default function AdminFarmaciaLayout() {
  const {modalOrdersMod, modalOrdersDrogMod,modalOrdersDetails,modalOrdersDrogDetails }= useAdmin();
      const{user,error } =useAuth({middleware:'adminfarmacia'});

      const navigate = useNavigate();
       useEffect(() => {
        if (user && parseInt(user.type_id) !== 3) {
            navigate('/admin/farmacia');
        }
    }, [user, navigate]);
  return (
    <>
       <div className="md:flex ">
      
        <SidebarFarmacia/>
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>
    </div>
    <Modal isOpen={modalOrdersMod? modalOrdersMod:(modalOrdersDrogMod|| modalOrdersDetails|| modalOrdersDrogDetails) } style={{ overlay: { backgroundColor: 'rgba(97, 97, 97, 0.98)' } }}>
  {modalOrdersMod ? <ModalOrdersMod />: (modalOrdersDrogMod ? <ModalOrdersDrogMod />: modalOrdersDetails?<ModalOrdersDetails/>:  modalOrdersDrogDetails?<ModalOrdersDrogDetails/>: null)}
    </Modal>
            <ToastContainer/>
        </>  

  )
}

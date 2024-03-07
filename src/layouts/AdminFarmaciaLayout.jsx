import {Outlet}from 'react-router-dom'
import SidebarFarmacia from "../components/SidebarFarmacia";
import { useAuth } from '../hooks/useAuth';
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import useAdmin from '../hooks/useAdmin';
import ModalOrdersMod from '../components/ModalOrdersMod';

export default function AdminFarmaciaLayout() {
  const {modalOrdersMod}= useAdmin();
      useAuth({middleware:'admin'});
  return (
    <>
       <div className="md:flex ">
      
        <SidebarFarmacia/>
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>
    </div>
    <Modal isOpen={modalOrdersMod}>
  {modalOrdersMod ? <ModalOrdersMod />: null}
    </Modal>
            <ToastContainer/>
        </>  

  )
}

import { Outlet,useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
export default function AuthLayout() {
      const navigate = useNavigate();
       useEffect(() => {
        if (user && parseInt(user.type_id) !== 3) {
            navigate('/admin');
        }
    }, [user, navigate]);
  return (
  <main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
     
      <div className="p-10 w-full">
         <img 
      src="../img/logo_ds.png"
      alt="Imagen de logo"
      className="max-w-xs"
      />
         <Outlet />
           <ToastContainer/>
      </div>
     
    </main>
  )
}

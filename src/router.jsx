import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import UsersAdmin from "./views/UsersAdmin";
import FarmaciasAdmin from "./views/FarmaciasAdmin";
import PedidosDrogueria from "./views/PedidosDrogueria";
import PedidosUsuarios from "./views/PedidosUsuarios";
import AdminFarmaciaLayout from "./layouts/AdminFarmaciaLayout";
import OrdersUsers from "./views/OrdersUsers";
import OrdersDrogueria from "./views/OrdersDrogueria";
import Perfile from "./views/Perfile";
import Estadisticas from "./views/Estadisticas";


const router = createBrowserRouter([
    {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
    ],
  },

    {
    path: "/usersAdmin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UsersAdmin />,
      },
    ],
  },
   {
    path: "/farmaciasAdmin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <FarmaciasAdmin />,
      },
    ],
  },
     {
    path: "/pedidosDrogueria",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PedidosDrogueria />,
      },
    ],
  },
   {
    path: "/pedidosUsers",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PedidosUsuarios />,
      },
    ],
  },
  
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin/farmacia",
    element: <AdminFarmaciaLayout/>,
    children: [
         {
        index: true,
        element:<OrdersUsers/>
      },
      {
        path: '/admin/farmacia/ordersUsers',
        element:<OrdersUsers/>
      },

      {
         path: '/admin/farmacia/ordersDrogueria',
        element:<OrdersDrogueria/>
      },

         {
         path: '/admin/farmacia/perfil',
        element:<Perfile/>
      },
         {
         path: '/admin/farmacia/estadisticas',
        element:<Estadisticas/>
      },

      
    ],
  },
  
]);

export default router;

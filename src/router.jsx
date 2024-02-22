import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import UsersAdmin from "./views/UsersAdmin";
import FarmaciasAdmin from "./views/FarmaciasAdmin";
import PedidosDrogueria from "./views/PedidosDrogueria";
import PedidosUsuarios from "./views/PedidosUsuarios";

const router = createBrowserRouter([
  {
    path: "/",
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
]);

export default router;

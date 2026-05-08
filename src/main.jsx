import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "./services/ProtectedRoute.jsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import { Cadastro } from "./pages/Cadastro.jsx";
import { Simulacao } from "./pages/Simulacao.jsx";
import { ClienteDashboard } from "./dashboards/clienteDashboard.jsx";
import { AdminDashboard } from "./dashboards/adminDashboard.jsx";
import { Perfil } from "./pages/Perfil.jsx";
import { EmDesenvolvimento } from "./pages/EmDesenvolvimento.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "cadastro",
        element: <Cadastro />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "perfil",
        element: <Perfil />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "simulacao",
        element: (
          <ProtectedRoute allowedRoles={["CLIENTE", "ADMIN"]}>
            <Simulacao />,
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["CLIENTE"]}>
            <ClienteDashboard />,
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "panel",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />,
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "contratos",
        element: (
          <ProtectedRoute allowedRoles={["CLIENTE"]}>
            <EmDesenvolvimento />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "resgates",
        element: (
          <ProtectedRoute allowedRoles={["CLIENTE"]}>
            <EmDesenvolvimento />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

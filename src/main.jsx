import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import { Cadastro } from "./pages/Cadastro.jsx";
import { Simulacao } from "./pages/Simulacao.jsx";

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
        path: "simulacao",
        element: <Simulacao />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

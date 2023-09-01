import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/index.tsx";
import MetersTable from "./features/Meters/index.tsx";
import MeterDetail from "./features/Meters/MeterDetail/index.tsx";
import EditMeter from "./features/Meters/EditMeter/index.tsx";
import CreateMeter from "./features/Meters/CreateMeter/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MetersTable />,
      },
      {
        path: "meters",
        element: <MetersTable />,
      },
      {
        path: "meters/:meterId",
        element: <MeterDetail />,
      },
      {
        path: "meters/:meterId/edit",
        element: <EditMeter />,
      },
      {
        path: "meters/new",
        element: <CreateMeter />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

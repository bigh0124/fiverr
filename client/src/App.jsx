import React from "react";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import Add from "./pages/add/Add";
import Login from "./pages/login/Login";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/register/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gigs",
        element: <Gigs />,
      },
      {
        path: "/gig/:id",
        element: <Gig />,
      },
      {
        path: "/mygigs",
        element: <MyGigs />,
      },
      {
        path: "/message/:id",
        element: <Message />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/pay/:id",
        element: <Pay />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Protect from "../helper/Protect";
import ModeContextProvider from "../context/ModeContext";
import MainLayout from "../layout/mainLayout";
import UserContextProvider from "../context/userContext";
import ProfilePage from "../pages/ProfilePage";
import ComponentContextProvider from "../context/ComponentContext";
import { Toaster } from "@/components/ui/toaster";
import SocketContextProvider from "../context/SocketContext";
import CreatePostPage from "../pages/CreatePostPage";
import UserProfilePage from "../pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Protect page={<HomePage />} />,
      },
      {
        path: "/profile",
        element: <Protect page={<ProfilePage />} />,
      },
      {
        path: "/create",
        element: <Protect page={<CreatePostPage />} />,
      },
      {
        path: "profile/:userId",
        element:<Protect page={<UserProfilePage/>}/>
      },
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ComponentContextProvider>
    <ModeContextProvider>
      <UserContextProvider>
        <SocketContextProvider>
          <RouterProvider router={router} />
        </SocketContextProvider>
        <Toaster />
      </UserContextProvider>
    </ModeContextProvider>
  </ComponentContextProvider>
);

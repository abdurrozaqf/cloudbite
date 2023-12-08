import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Profie from "@/pages/profiles";
import EditProfile from "@/pages/profiles/edit-profile";
import DetailPosts from "@/pages/posts/detail";
import HistoryPost from "@/pages/profiles/history-post";
import ListPost from "@/pages/posts";
import ProtectedRoutes from "./protected-routes";
import NotFound from "@/pages/not-found";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
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
          path: "/list-post/:keyword",
          element: <ListPost />,
        },
        {
          path: "/detail-post/:post_id",
          element: <DetailPosts />,
        },
        {
          path: "/history-post",
          element: <HistoryPost />,
        },
        {
          path: "/profile",
          element: <Profie />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

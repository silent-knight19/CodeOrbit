import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/user/profile";
import { useAuth } from "./authContext";


const ProjectRoutes = () => {
  const { currentUser, setcurrentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const UserIdFromLocalStorage = localStorage.getItem("userId");
    if (UserIdFromLocalStorage && !currentUser) {
      setcurrentUser(UserIdFromLocalStorage);
    }
    if (
      !UserIdFromLocalStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }
if(UserIdFromLocalStorage && window.location.pathname==="/auth"){
    navigate("/");
}
  },[currentUser,navigate,setcurrentUser]);

  let element =useRoutes([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/",
        element:<Dashboard/>
    },
    {
        path:"/profile",
        element:<Profile/>
    }
]);
return element;
}
export default ProjectRoutes;
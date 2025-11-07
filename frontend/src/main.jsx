import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./authContext";
import ProjectRoutes from "./Routes";
import{BrowserRouter as Router} from "react-router-dom";
ReactDom.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <Router>
            <ProjectRoutes/>
        </Router>
    </AuthProvider>
    );
import React from "react";

import { View } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes(){
    const isAuthentication = false;
    const loading = false;
    return(
        isAuthentication ?  <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;
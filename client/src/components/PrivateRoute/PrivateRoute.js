import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children, role=[]}) => {
    const {isAuth, user} = useSelector(s => s.auth)
    const userRole = role.includes(user.role)

    return (
        isAuth && userRole
            ? children
            : <Navigate to='/sign_in'/>
    );
};

export default PrivateRoute;
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.authReducer);
  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname, name: "sahnwaz" }}
        replace
      />
    );
  }
  return children;
};

export default PrivateRoute;

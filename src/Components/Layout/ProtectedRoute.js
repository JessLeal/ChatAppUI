import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.isLoading);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : user != null ? (
        <>{Component}</>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;

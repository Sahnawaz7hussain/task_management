import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Tasks from "../pages/Tasks";
import PrivateRoute from "./PrivateRoute";
import CreateTask from "../pages/CreateTask";
import { Typography } from "@mui/material";
import UpdateTask from "../pages/UpdateTask";
import Invitation from "../pages/Invitation";
import VerifyEmail from "../pages/VerifyEmail";
const MainRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />

      <Route
        path="/createtask"
        element={
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/updatetask/:taskId"
        element={
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/invitation/:taskId"
        element={
          <PrivateRoute>
            <Invitation />
          </PrivateRoute>
        }
      />
      <Route path="/verify/:hash/:email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Typography>Page not found</Typography>} />
    </Routes>
  );
};

export default MainRoute;

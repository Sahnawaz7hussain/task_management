import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Tasks from "../pages/Tasks";
import PrivateRoute from "./PrivateRoute";
import CreateTask from "../pages/CreateTask";
import { Typography } from "@mui/material";
import UpdateTask from "../pages/UpdateTask";
import Invitations from "../pages/Invitations";

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
        path="/invitations"
        element={
          <PrivateRoute>
            <Invitations />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Typography>Page not found</Typography>} />
    </Routes>
  );
};

export default MainRoute;

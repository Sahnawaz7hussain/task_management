import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task, deleteTask }) => {
  // console.log("tasK : ", task);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          m: 0,
          position: "relative",
          boxSizing: "border-box",
          pb: "50px",
        }}
      >
        <CardContent>
          <Typography component="h1" variant="h6">
            {task.title}
          </Typography>
          <Typography>{task.description}</Typography>
          <Stack
            direction={"row"}
            spacing={4}
            sx={{
              mt: "10px",
              p: 0,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              label={task.status}
              sx={{
                color: "#fff",
                background: task.status === "completed" ? "green" : "orange",
              }}
            />
            <Chip
              label={`Due ${task.dueDate}`}
              sx={{ color: "#fff", background: "blue" }}
            />
          </Stack>
        </CardContent>

        {task.userId._id === userId() ? (
          <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
            <Link to={`updatetask/${task._id}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={() => deleteTask(task._id)}>Delete</Button>
          </CardActions>
        ) : (
          <Typography
            sx={{ position: "absolute", bottom: "15px", left: "10px" }}
          >
            Task assign by <strong>{task.userId.name}</strong>
          </Typography>
        )}
      </Card>
    </>
  );
};

export default TaskCard;

function userId() {
  return JSON.parse(localStorage.getItem("user")).id;
}

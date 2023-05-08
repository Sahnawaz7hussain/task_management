import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task, deleteTask, updateTaskStatus }) => {
  // console.log("tasK : ", task);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUpdateStatus = (status, taskId) => {
    setAnchorEl(null);
    if (status === undefined || taskId === undefined) return;
    updateTaskStatus(status, taskId);
    //console.log("chip: ", status, id);
  };

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
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              label={task.status}
              sx={{
                color: "#fff",
                background: task.status === "completed" ? "green" : "orange",
              }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleUpdateStatus()}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleUpdateStatus("todo", task._id)}>
                Todo
              </MenuItem>
              <MenuItem
                onClick={() => handleUpdateStatus("inprogress", task._id)}
              >
                Inprogress
              </MenuItem>
              <MenuItem
                onClick={() => handleUpdateStatus("completed", task._id)}
              >
                Completed
              </MenuItem>
            </Menu>
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

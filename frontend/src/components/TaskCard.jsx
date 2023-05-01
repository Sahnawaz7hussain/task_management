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
  return (
    <>
      <Card variant="outlined" sx={{ m: 5 }}>
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
              sx={{ color: "#fff", background: "orange" }}
            />
            <Chip
              label={`Due ${task.dueDate}`}
              sx={{ color: "#fff", background: "blue" }}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Link to={`updatetask/${task._id}`}>
            <Button>Update</Button>
          </Link>
          <Button onClick={() => deleteTask(task._id)}>Delete</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TaskCard;

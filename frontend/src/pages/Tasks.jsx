import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskActionFn,
  getTaskActionFn,
} from "../redux/taskReducer/taskActions";

const Tasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(function (state) {
    return state.taskReducer;
  });

  //console.log("sa: ", taskState);
  function getTasks() {
    dispatch(getTaskActionFn());
  }

  useEffect(() => {
    const cleanup = getTasks();

    return () => {
      cleanup;
    };
  }, []);

  const deleteTask = (id) => {
    dispatch(deleteTaskActionFn(id))
      .then((res) => {
        getTasks();
      })
      .catch((err) => {
        getTasks();
      });
  };

  const updateTask = (id) => {
    alert(`${id}`);
  };
  return (
    <Box>
      <Stack
        direction={"row"}
        sx={{ px: 5, my: "15px" }}
        justifyContent={"space-between"}
      >
        <Typography variant="h4">Tasks</Typography>
        <Link to="/createtask">
          <Button variant="contained">Create new Task</Button>
        </Link>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: `repeat(1,1fr)`, md: `repeat(3,1fr)` },
        }}
      >
        {taskState.data.length > 0 &&
          taskState.data.map((task, idx) => (
            <TaskCard
              key={idx}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Tasks;

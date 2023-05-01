import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskByIdActionFn,
  postTaskActionFn,
} from "../redux/taskReducer/taskActions";
import { useParams } from "react-router-dom";

// let initData = {
//   title: "",
//   description: "",
//   dueDate: "",
// };
const UpdateTask = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const task = useSelector((state) => state.taskReducer);
  const [data, setData] = useState(task.data);

  console.log("taskdd", data);
  useEffect(() => {
    dispatch(getTaskByIdActionFn(taskId));
  }, []);

  const handleOnChange = (e) => {
    let { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreate = () => {
    if (!data.title || !data.description || !data.dueDate) return;
    dispatch(postTaskActionFn(data))
      .then((res) => {
        if (res.type === "ADD_TASK_SUCCESS") {
          alert(`${res.payload.message}`);
        } else {
          alert(`${res.payload.message}`);
        }
        //console.log("res: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("d: ", data);
  };

  return (
    <Box component={"form"} sx={{ mt: 5, mb: 15 }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h2">Create new Task</Typography>
        <FormControl fullWidth>
          <TextField
            label="Title"
            name="title"
            value={data.title}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            multiline={true}
            rows={5}
            label="Description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
          />
        </FormControl>
        <Button variant="contained" fullWidth onClick={handleCreate}>
          Add
        </Button>
      </Container>
    </Box>
  );
};

export default UpdateTask;

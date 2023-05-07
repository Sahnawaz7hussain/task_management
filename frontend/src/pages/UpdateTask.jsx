import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTaskByIdActionFn,
  postTaskActionFn,
  updateTaskActionFn,
} from "../redux/taskReducer/taskActions";

// let initData = {
//   title: "",
//   description: "",
//   dueDate: "",
// };
const UpdateTask = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();

  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    dispatch(getTaskByIdActionFn(taskId))
      .then((res) => {
        setUpdateData(res.payload);
        setError(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const handleOnChange = (e) => {
    let { value, name } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    if (!updateData.title || !updateData.description || !updateData.dueDate)
      return;
    dispatch(updateTaskActionFn(taskId, updateData))
      .then((res) => {
        if (res.type === "UPDATE_TASK_SUCCESS") {
          alert("Task update Successfully");
          navigate("/");
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  const handleChange = (e) => {
    console.log("change: ", e);
  };
  return (
    <Box component={"form"} sx={{ mt: 5, mb: 15 }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h2">Update Task</Typography>
        {error && (
          <Box component={"span"} sx={{ color: "red" }}>
            Something went wrong Please try again!
          </Box>
        )}
        <FormControl fullWidth>
          <TextField
            label="Title"
            name="title"
            value={updateData.title || ""}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            multiline={true}
            rows={5}
            label="Description"
            name="description"
            value={updateData.description || ""}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl sx={{ width: "150px", ml: 0 }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            value={updateData.status || ""}
            name="status"
            onChange={handleOnChange}
          >
            <MenuItem value={"todo"} sx={{ color: "orange" }}>
              Todo
            </MenuItem>
            <MenuItem value={"inprogress"} sx={{ color: "orange" }}>
              Inprogress
            </MenuItem>
            <MenuItem value={"completed"} sx={{ color: "green" }}>
              Completed
            </MenuItem>
          </Select>
        </FormControl>
        <input
          style={{ width: "100%", height: "40px" }}
          type="date"
          name="dueDate"
          value={updateData.dueDate || ""}
          onChange={handleOnChange}
        />
        <Button variant="contained" fullWidth onClick={handleUpdate}>
          update
        </Button>
      </Container>
    </Box>
  );
};

export default UpdateTask;

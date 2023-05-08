import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskActionFn,
  getDeadlineExceededTasksActionFn,
  getTaskActionFn,
} from "../redux/taskReducer/taskActions";
import { AppContext } from "../context/AppContext";

const Tasks = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("tasks") || "all");
  const [page, setPage] = useState(searchParams.get("_page") || 1);
  const [isDeadline, setIsDeadline] = useState(false);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const { isLoading, isError, data } = useSelector(function (state) {
    return state.taskReducer;
  });

  console.log(data);
  function getTasks(params) {
    dispatch(getTaskActionFn(params));
  }
  useEffect(() => {
    const params = {};
    params.tasks = filter;
    params._page = page;

    setSearchParams(params);
  }, [filter, page]);

  useEffect(() => {
    const query = {};
    filter && (query.tasks = searchParams.get("tasks"));
    page && (query._page = searchParams.get("_page"));
    if (query.tasks !== null || query._page !== null) {
      getTasks(query);
    }
  }, [searchParams, statusUpdated]);

  const { socket } = useContext(AppContext);

  // HANLDE GET DEADLINE PASSED TASKS;
  const handleOnClickDeadlineExceeded = () => {
    if (isDeadline) return;
    setSearchParams({});
    setIsDeadline(true);
    dispatch(getDeadlineExceededTasksActionFn());
  };

  // HANDLE ONCHANGE OF FILTER TASKS
  const handleOnChangeFilter = (e) => {
    setFilter(e.target.value);
    setIsDeadline(false);
  };
  // HANDLE ONCLICK PAGINATION
  const handleOnClickPagination = (val) => {
    setPage((pre) => Number(pre) + val);
    setIsDeadline(false);
  };

  // DELETE A TASK BY ID
  const deleteTask = (id) => {
    dispatch(deleteTaskActionFn(id))
      .then((res) => {
        getTasks();
      })
      .catch((err) => {
        getTasks();
      });
  };

  const updateTaskStatus = (status, taskId) => {
    if (isDeadline) return;
    socket.emit("update-status", { status, taskId });
    setStatusUpdated(false);
  };

  // listen socket update status
  socket.on("status-updated", (updatedData) => {
    if (updatedData.status) {
      setStatusUpdated(true);
    } else {
      setStatusUpdated(false);
    }
    // console.log("data: ", updatedData);
  });
  return (
    <Box sx={{ px: { xs: 2, sm: 2, md: 5 } }}>
      <Stack
        direction={"row"}
        sx={{ px: 0, my: "15px" }}
        justifyContent={"space-between"}
      >
        <Typography variant="h4">Tasks</Typography>
        <Link to="/createtask">
          <Button variant="contained">Create new Task</Button>
        </Link>
      </Stack>

      <Stack
        direction={{ sx: "column", sm: "row", md: "row" }}
        sx={{ width: "fit-content", minWidth: 100, mb: 2, gap: 2 }}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Filter"
            value={filter}
            onChange={handleOnChangeFilter}
          >
            <MenuItem value={"all"}>All Tasks</MenuItem>
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
        <Button
          variant={isDeadline ? "contained" : "outlined"}
          color="error"
          onClick={handleOnClickDeadlineExceeded}
        >
          Deadline Exceeded
        </Button>
        {data?.pendingTasks && (
          <Button variant="outlined" color="warning">
            {data.pendingTasks} Pending tasks
          </Button>
        )}
      </Stack>
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: { sm: `repeat(1,1fr)`, md: `repeat(3,1fr)` },
        }}
      >
        {data.task?.length > 0 &&
          data.task.map((task, idx) => (
            <TaskCard
              key={idx}
              task={task}
              deleteTask={deleteTask}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
      </Box>
      {data?.totalPages && (
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            gap: 2,

            width: "fit-content",
            m: "auto",
            my: 2,
          }}
        >
          <Button
            variant="contained"
            disabled={page <= 1}
            onClick={() => handleOnClickPagination(-1)}
          >
            Prev
          </Button>
          <Typography>{page}</Typography>
          <Button
            variant="contained"
            disabled={page == data?.totalPages}
            onClick={() => handleOnClickPagination(+1)}
          >
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Tasks;

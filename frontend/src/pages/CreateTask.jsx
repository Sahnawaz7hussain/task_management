import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTaskActionFn } from "../redux/taskReducer/taskActions";
import { getAllUsersActionFn } from "../redux/authReducer/authActions";
import { postInviteActionFn } from "../redux/inviteReducer/inviteActions";

let initData = {
  title: "",
  description: "",
  dueDate: "",
};
const CreateTask = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initData);
  const [invite, setInvite] = useState([]);

  const { isLoading, isError, users } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    dispatch(getAllUsersActionFn());
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
          if (invite.length > 0) {
            console.log("done: ");
            dispatch(
              postInviteActionFn({
                invitations: invite,
                task: res.payload.task._id,
                title: data.title,
                ...getNameAndEmail(),
              })
            ).then((res) => {
              alert(`New task created`);
              //console.log("invite res: ", res);
              setData(initData);
            });
          } else {
            alert(`New task created`);
          }
        } else {
          alert(`${res.payload.message}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckbox = (e) => {
    let option = e.target.value;
    let newInvite = [...invite];
    if (newInvite.includes(option)) {
      newInvite.splice(newInvite.indexOf(option), 1);
    } else {
      newInvite.push(option);
    }
    setInvite(newInvite);
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
        <FormControl fullWidth sx={{ maxHeight: "200px", overflowY: "scroll" }}>
          <FormLabel>Invite</FormLabel>
          {isLoading ? (
            <Box component={"span"}> Loading...</Box>
          ) : (
            users.map((user, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    value={user._id}
                    onChange={(e) => handleCheckbox(e)}
                  />
                }
                label={user.name}
              />
            ))
          )}
        </FormControl>
        <input
          style={{ width: "100%", height: "40px" }}
          type="date"
          name="dueDate"
          value={data.dueDate}
          onChange={handleOnChange}
        />
        <Button variant="contained" fullWidth onClick={handleCreate}>
          Add
        </Button>
      </Container>
    </Box>
  );
};

export default CreateTask;

function getNameAndEmail() {
  let data = JSON.parse(localStorage.getItem("user"));
  return { name: data.name, email: data.email };
}

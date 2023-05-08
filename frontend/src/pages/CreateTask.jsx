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
  const [creating, setCreating] = useState(false);
  const [invite, setInvite] = useState([]);
  const [emails, setEmails] = useState([]);

  const { isLoading, isError, users } = useSelector(
    (state) => state.authReducer
  );
  // console.log("user: ", users);

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
    setCreating(true);
    dispatch(postTaskActionFn(data))
      .then((res) => {
        if (res.type === "ADD_TASK_SUCCESS") {
          if (invite.length > 0) {
            dispatch(
              postInviteActionFn({
                invitations: invite,
                emails: emails,
                task: res.payload.task._id,
                title: data.title,
                ...getNameAndEmail(),
              })
            ).then((res) => {
              alert(`New task created`);
              //console.log("invite res: ", res);
              setData(initData);
              setCreating(false);
            });
          } else {
            alert(`New task created`);
          }
        } else {
          alert(`${res.payload.message}`);
        }
      })
      .catch((err) => {
        setCreating(false);
        console.log(err);
      });
  };

  const handleCheckbox = (e) => {
    let option = e.target.value;
    let options = option.split("+");
    //  console.log("option: ", options);
    let newInvite = [...invite];
    let newEmails = [...emails];
    if (newInvite.includes(options[0])) {
      newInvite.splice(newInvite.indexOf(options[0]), 1);
      newEmails.splice(newEmails.indexOf(options[1]), 1);
    } else {
      newInvite.push(options[0]);
      newEmails.push(options[1]);
    }
    // console.log("inside checkbox: invite", newInvite);
    // console.log("inside checkbox: emails", newEmails);
    setInvite(newInvite);
    setEmails(newEmails);
  };

  // console.log("invite", invite);
  // console.log("emails", emails);
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
                    value={`${user._id}+${user.email}`}
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
          {creating ? "Creating new task..." : "Create new task"}
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

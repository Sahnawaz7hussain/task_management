import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInviteActionFn,
  updateInviteActionFn,
} from "../redux/inviteReducer/inviteActions";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import {
  getTaskByIdActionFn,
  updateCollaboratiosActionFn,
} from "../redux/taskReducer/taskActions";
import { Link, useParams } from "react-router-dom";

const Invitation = () => {
  const dispatch = useDispatch();
  const [invitation, setInvitation] = useState({});
  const { taskId } = useParams(); //
  // const taskId = "6457c60ad5eacabb72244090";
  const inviteData = useSelector((state) => state.taskReducer);
  useEffect(() => {
    dispatch(getTaskByIdActionFn(taskId))
      .then((res) => {
        setInvitation(res.payload);
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  const handleAccept = (id, taskId) => {
    dispatch(updateInviteActionFn(id))
      .then((res) => {
        // console.log("res: ", res);
        dispatch(updateCollaboratiosActionFn(taskId)).then((res) => {
          //console.log("update colab res: ", res);
          dispatch(getInviteActionFn());
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const handleReject = (id) => {
    dispatch(updateInviteActionFn(id))
      .then((res) => {
        dispatch(getInviteActionFn());
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  console.log("invite: ", inviteData);
  return (
    <>
      <Container
        sx={{
          width: { xs: "95%", sm: "60%", md: "40%" },
          maxWidth: "sm",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          mt: 4,
        }}
      >
        {inviteData.isLoading ? (
          <Box
            component={"span"}
            sx={{
              fontSize: 24,
              m: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2">Loading...</Typography>
          </Box>
        ) : (
          <>
            <Card
              sx={{
                m: 0,
                width: "100%",
                position: "relative",
                boxSizing: "border-box",
                pb: "50px",
              }}
            >
              <CardContent>
                <Typography component="h1" variant="h6">
                  {invitation.title}
                </Typography>
                <Typography>{invitation.description}</Typography>
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
                    label={invitation.status}
                    sx={{
                      color: "#fff",
                      background:
                        invitation.status === "completed" ? "green" : "orange",
                    }}
                  />
                  <Chip
                    label={`Due ${invitation.dueDate}`}
                    sx={{ color: "#fff", background: "blue" }}
                  />
                </Stack>
              </CardContent>

              <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
                <Button variant="contained">Accept</Button>

                <Button variant="contained" color="error">
                  Reject
                </Button>
              </CardActions>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default Invitation;

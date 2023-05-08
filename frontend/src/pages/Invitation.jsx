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
  const { taskId } = useParams(); //
  const dispatch = useDispatch();
  const [invitation, setInvitation] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // const taskId = "6457c60ad5eacabb72244090";
  useEffect(() => {
    // dispatch(getTaskByIdActionFn(taskId))
    //   .then((res) => {
    //     setInvitation(res.payload);
    //     console.log("res: ", res);
    //   })
    //   .catch((err) => {
    //     console.log("err: ", err);
    //   });
    setLoading(true);
    dispatch(getInviteActionFn(taskId))
      .then((res) => {
        setInvitation(res.payload);
        console.log("res: ", res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err: ", err);
        setLoading(false);
      });
  }, []);

  const handleAccept = (id, taskId) => {
    dispatch(updateInviteActionFn(id))
      .then((res) => {
        console.log("update invite res: ", res);
        dispatch(updateCollaboratiosActionFn(taskId)).then((res) => {
          setSuccess(true);
          console.log("update colab res: ", res);
        });
      })
      .catch((err) => {
        setSuccess(false);
        console.log("err: ", err);
      });
    // console.log("Id: ", id, "!!---- taskId: ", taskId);
  };
  const handleReject = (id) => {
    dispatch(updateInviteActionFn(id))
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        console.log("err: ", err);
      });
  };
  if (success) {
    return (
      <>
        <Typography component={"h1"} variant="h3">
          Your action has been granted.
        </Typography>
        <Link to="/">
          <Button>Go to tasks</Button>
        </Link>
      </>
    );
  }
  console.log("invite: ", invitation);
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
        {error && <Typography>Something went wrong </Typography>}
        {loading ? (
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
            {!invitation ? (
              <>
                <Typography component={"h1"} variant="h3">
                  Your action has been granted.
                </Typography>
                <Link to="/">
                  <Button>Go to tasks</Button>
                </Link>
              </>
            ) : (
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
                    {invitation.task?.title}
                  </Typography>
                  <Typography>{invitation.task?.description}</Typography>
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
                      label={invitation.task?.status}
                      sx={{
                        color: "#fff",
                        background:
                          invitation.task?.status === "completed"
                            ? "green"
                            : "orange",
                      }}
                    />
                    <Chip
                      label={`Due ${invitation.task?.dueDate}`}
                      sx={{ color: "#fff", background: "blue" }}
                    />
                  </Stack>
                </CardContent>

                <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleAccept(invitation._id, invitation.task?._id)
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReject(invitation._id)}
                  >
                    Reject
                  </Button>
                </CardActions>
              </Card>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Invitation;

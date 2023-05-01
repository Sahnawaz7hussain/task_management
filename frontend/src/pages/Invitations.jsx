import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInviteActionFn,
  updateInviteActionFn,
} from "../redux/inviteReducer/inviteActions";
import { Box, Button, Stack, Typography } from "@mui/material";
import { updateCollaboratiosActionFn } from "../redux/taskReducer/taskActions";

const Invitations = () => {
  const dispatch = useDispatch();
  const inviteData = useSelector((state) => state.inviteReducer);
  useEffect(() => {
    dispatch(getInviteActionFn());
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
  // console.log("invite: ", inviteData);
  return (
    <div>
      {inviteData.isLoading && (
        <Box
          component={"span"}
          sx={{
            fontSize: 24,
            m: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Loading
        </Box>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: `repeat(1,1fr)`, md: `repeat(3,1fr)` },
        }}
      >
        {inviteData.data.length > 0 &&
          inviteData.data.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                height: "auto",
                width: "auto",
                minHeight: "200px",
                border: "1px solid lightgray",
                m: { xs: 2, sm: 2, md: 5 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                boxSizing: "border-box",
                p: { xs: 2, sm: 2, md: 3 },
              }}
            >
              <Typography variant="h5">
                <strong> {item.userId.name}</strong> has invited you
              </Typography>
              <Typography>
                contribute to <strong> {item?.task?.title} </strong>
              </Typography>
              <Stack
                direction={"row"}
                justifyContent="space-around"
                gap={"15px"}
              >
                <Button
                  variant="contained"
                  onClick={() => handleReject(item._id)}
                >
                  reject
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleAccept(item._id, item.task._id)}
                >
                  Accepet
                </Button>
              </Stack>
            </Box>
          ))}
      </Box>
    </div>
  );
};

export default Invitations;

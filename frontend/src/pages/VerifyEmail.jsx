import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { hash, email } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/verifyemail`, {
        hash,
        email,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.verification) {
          setSuccess(true);
          setError(false);
        } else {
          setError(true);
          setSuccess(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        setSuccess(false);
      });
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 15,
        alignItems: "center",
        maxWidth: "sm",
      }}
    >
      {loading && (
        <Typography component={"h1"} variant="h3">
          Verifying Your Email Please Wait a moment...
        </Typography>
      )}
      {error && (
        <>
          <Typography component={"h1"} variant="h3">
            Not able to verify Your Email Please try again
          </Typography>
          <br />
          <p>Or</p>
          <br />
          <p>Please Refresh the page</p>
        </>
      )}
      {success && (
        <>
          <Typography component={"h1"} variant="h3">
            Email verification complete
          </Typography>
          <Link to="/login">
            <Button variant="outline">To Login Click Here</Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default VerifyEmail;

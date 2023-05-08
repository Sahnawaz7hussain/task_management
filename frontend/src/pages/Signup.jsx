import React, { useState } from "react";

import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
  FormHelperText,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignupActionFn } from "../redux/authReducer/authActions";
const theme = createTheme();

export default function Signup() {
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
      name: `${data.get("firstName")} ${data.get("lastName")}`,
    };
    if (
      !userData.email ||
      userData.name.length < 2 ||
      userData.password.length < 6
    )
      return;
    if (!validateEmail(userData.email)) {
      return setInvalidEmail(true);
    }
    dispatch(userSignupActionFn(userData))
      .then((res) => {
        if (res.type === "USER_SIGNUP_SUCCESS") {
          alert(`${res.payload.message}`);
          setSuccess(true);
          console.log(" signupres:", res);
        } else {
          alert(`${res.payload.message}`);
          setSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccss(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ position: "relative", border: "1px solid #fff" }}
      >
        <CssBaseline />
        {invalidEmail && (
          <Box sx={{ position: "absolute", top: 0, right: "0", left: 0 }}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setInvalidEmail(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Warning</AlertTitle>
              <strong>Invalid email type!</strong>
            </Alert>
          </Box>
        )}
        {success ? (
          <>
            <Typography component="h2" variant="h4" sx={{ mt: 20 }}>
              A verification email has sent to you email please verify you
              email!
            </Typography>
          </>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              {password && password.length < 6 && (
                <FormHelperText sx={{ color: "red" }}>
                  password should atleast 6 char.
                </FormHelperText>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

function validateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupValidation from "./SignupValidation";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(SignupValidation(values));

    if (error.username || error.email || error.password || error.cpassword) {
      return;
    }

    axios
      .post("http://localhost:5000/signup", values)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);

        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);

          if (
            err.response.data &&
            err.response.data.error === "Email is already registered"
          ) {
            setError((prev) => ({
              ...prev,
              email: "Email is already registered",
            }));
          }
        } else if (err.request) {
          console.error("Request failed:", err.request);
        } else {
          console.error("Error message:", err.message);
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              onChange={handleChange}
              autoComplete="username"
              autoFocus
            />
            {error.username && (
              <span style={{ color: "red" }}>{error.username}</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            {error.username && (
              <span style={{ color: "red" }}>{error.email}</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error.username && (
              <span style={{ color: "red" }}>{error.password}</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="cpassword"
              onChange={handleChange}
              label="Confirm Password"
              type="password"
              id="cpassword"
              autoComplete="confirm-password"
            />
            {error.username && (
              <span style={{ color: "red" }}>{error.cpassword}</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;

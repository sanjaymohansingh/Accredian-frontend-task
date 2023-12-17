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

const Tes = () => {
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

    // Check if there are no validation errors
    if (error.username && error.email && error.password && error.cpassword) {
      axios
        .post("http://localhost:5000/signup", values)
        .then((res) => {
          navigate("/signin");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            />{" "}
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
            />{" "}
            {error.username && (
              <span style={{ color: "red" }}>{error.username}</span>
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
            />{" "}
            {error.username && (
              <span style={{ color: "red" }}>{error.username}</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="cpassword"
              onChange={handleChange}
              label="Confirm Password"
              type="cpassword"
              id="cpassword"
              autoComplete="confirm-password"
            />{" "}
            {error.username && (
              <span style={{ color: "red" }}>{error.username}</span>
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

export default Tes;

import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Login = () => {
  const [data, setData] = useState({});
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSubmitGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="subtitle1">Welcome back!</Typography>
      </Box>
      <Box sx={{ paddingTop: "24px" }}>
        <TextField
          onChange={(event) => handleInput(event)}
          sx={{ paddingBottom: "15px" }}
          name="email"
          label="Email address"
          variant="outlined"
          fullWidth
          autoComplete="off"
        />
        <TextField
          onChange={(event) => handleInput(event)}
          sx={{ paddingBottom: "15px" }}
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          autoComplete="off"
        />
      </Box>
      <Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{ padding: "12px" }}
        >
          Continue
        </Button>
      </Box>
      <Box
        sx={{ paddingTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Typography variant="body1" color={"GrayText"}>
          or
        </Typography>
      </Box>
      <Box
        sx={{ paddingTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Typography variant="subtitle1">Login in using</Typography>
      </Box>
      <Box sx={{ paddingTop: "10px" }}>
        <Button
          onClick={handleSubmitGoogle}
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            textTransform: "none",
            padding: "12px",
          }}
        >
          Login in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

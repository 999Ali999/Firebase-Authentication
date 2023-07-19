import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

const SignUp = () => {
  const [data, setData] = useState({});
  const [confirm, setConfirm] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
    // console.log(data);
  };

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
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

  const confirmHnadler = (event) => {
    if (event.target.value === data.password) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="subtitle1">
          Please provide your information below.
        </Typography>
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
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          autoComplete="off"
        />
        <TextField
          sx={{ paddingBottom: "15px" }}
          onChange={(event) => confirmHnadler(event)}
          id="outlined-basic"
          label="Confirm Password"
          type="password"
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
          disabled={confirm ? false : true}
        >
          Continue
        </Button>
      </Box>
      <Box
        sx={{ paddingTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <Typography variant="body1" color={"GrayText"}>
          or
        </Typography>
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
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;

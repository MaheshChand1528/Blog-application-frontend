import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./util";

const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wform = useSelector((state) => state.isSignup);
  useEffect(() => {
    setIsSignUp(wform);
  }, [wform]);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignUp] = useState(true);
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("https://localhost:5000/blogs"))
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("http://localhost:5000/blogs"))
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography
            className={classes.font}
            variant="h3"
            padding={3}
            textAlign="center"
          >
            {isSignup ? "SignUp" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              className={classes.font}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              onChange={handleChange}
              name="name"
            />
          )}
          <TextField
            className={classes.font}
            type={"email"}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            onChange={handleChange}
            name="email"
          />
          <TextField
            className={classes.font}
            type={"password"}
            value={inputs.password}
            placeholder="Password"
            margin="normal"
            onChange={handleChange}
            name="password"
          />
          <Button
            className={classes.font}
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            className={classes.font}
            onClick={() => {
              setIsSignUp(!isSignup);
              setInputs({ name: "", email: "", password: "" });
            }}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;

import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./util";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleInputs = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/myBlogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor={"blue"}
          borderRadius="10"
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin={"auto"}
          marginTop="1.5vmax"
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding="3"
            color={"grey"}
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyle}>
            Title
          </InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            name="title"
            value={inputs.title}
            onChange={handleInputs}
          />
          <InputLabel className={classes.font} sx={labelStyle}>
            Description
          </InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            name="description"
            value={inputs.description}
            onChange={handleInputs}
          />
          <InputLabel className={classes.font} sx={labelStyle}>
            ImageURL
          </InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            name="imageURL"
            value={inputs.imageURL}
            onChange={handleInputs}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3, padding: 1 }}
            color="warning"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;

import React, { useEffect, useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./util";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleInputs = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/myBlogs"));
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      console.log(data.blog);
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  return (
    <div>
      {inputs && (
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
              Edit Your Blog
            </Typography>
            <InputLabel className={classes.font} sx={labelStyle}>Title</InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              name="title"
              value={inputs.title}
              onChange={handleInputs}
            />
            <InputLabel className={classes.font} sx={labelStyle}>Description</InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              name="description"
              value={inputs.description}
              onChange={handleInputs}
            />
            <Button
            className={classes.font}
              type="submit"
              variant="contained"
              sx={{ borderRadius: 3, marginTop: 3, padding: 1 }}
              color="warning"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;

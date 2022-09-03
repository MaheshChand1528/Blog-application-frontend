import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./util";

const Blog = ({
  title,
  description,
  imageURL,
  userName,
  date,
  month,
  year,
  isUser,
  id,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(navigate("/blogs"));
  };
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 4,
          mb: 2,
          padding: 2,
          boxShadow: "8px 8px 16px #ccc",
          ":hover": {
            boxShadow: "16px 16px 32px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton
              sx={{ marginLeft: "auto", color: "green" }}
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton sx={{ color: "red" }} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          className={classes.font}
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={title}
          subheader={date + "/" + month + "/" + year}
        />
        <CardMedia component="img" height="194" image={imageURL} alt={title} />
        <CardContent>
          <hr />
          <br />
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{userName} : </b>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;

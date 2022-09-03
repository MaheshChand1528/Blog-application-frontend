import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState();
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    setUser(data.blogs.name);
    return data.blogs.blogs;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data));
    console.log(blogs);
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user}
            date={blog.date}
            month={blog.month}
            year={blog.year}
          />
        ))}
    </div>
  );
};

export default UserBlogs;

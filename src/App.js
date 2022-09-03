import "./App.css";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Auth from "./component/Auth";
import Blogs from "./component/Blogs";
import UserBlogs from "./component/UserBlogs";
import BlogDetail from "./component/BlogDetail";
import AddBlog from "./component/AddBlog";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch=useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId"))
    {
      dispatch(authActions.login());
    }
  },[dispatch])

  return (
    <>
      <Header />
      <Routes>
        {!isLoggedIn ? (
          <Route exact path="/auth" element={<Auth />} />
        ) : (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route exact path="/myBlogs" element={<UserBlogs />} />
            <Route exact path="/myBlogs/:id" element={<BlogDetail />} />
            <Route exact path="/blogs/add" element={<AddBlog />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

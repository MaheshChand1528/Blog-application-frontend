import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/index";
import { useStyles } from "./util";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 50%, rgba(2,0,200,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography className={classes.font} variant="h4">
            Blogs App
          </Typography>
          {isLoggedIn && (
            <Box marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => {
                  setValue(val);
                }}
              >
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs"
                  label="All Blogs"
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/myBlogs"
                  label="My Blogs"
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs/add"
                  label="Add Blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  className={classes.font}
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 5 }}
                  color="warning"
                  onClick={() => {
                    dispatch(authActions.changeToLogin());
                  }}
                >
                  Login
                </Button>
                <Button
                  className={classes.font}
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 5 }}
                  color="warning"
                  onClick={() => {
                    dispatch(authActions.changeToSignUp());
                  }}
                >
                  SignUp
                </Button>{" "}
              </>
            )}
            {isLoggedIn && (
              <Button
                className={classes.font}
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 5 }}
                color="warning"
              >
                LogOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

import Stories from "./sites/Stories";
import { Box, Toolbar } from "@mui/material";
import Navigation from "./components/Navigation";
import User from "./components/User";
import Story from "./components/Story";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

export const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (bool) => {
    setOpen(bool);
  };

  return (
    <BrowserRouter>
      <Navigation open={open} handler={handleOpen}></Navigation>
      <Box
        sx={open && { width: { sm: "calc(100%-256px)" }, ml: { sm: "256px" } }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/new" />}></Route>
          <Route
            path="/new"
            element={<Stories storyType={"newstories"}></Stories>}
          ></Route>
          <Route
            path="/top"
            element={<Stories storyType={"topstories"}></Stories>}
          ></Route>
          <Route
            path="/ask"
            element={<Stories storyType={"askstories"}></Stories>}
          ></Route>
          <Route
            path="/show"
            element={<Stories storyType={"showstories"}></Stories>}
          ></Route>
          <Route
            path="/jobs"
            element={<Stories storyType={"jobstories"}></Stories>}
          ></Route>
          {/* <Route
            path="/comments"
            element={<Comment commentID={2921983}></Comment>}
          ></Route> */}
          <Route path="/user/:userID" element={<User></User>}></Route>
          <Route
            path="/story/:storyID"
            element={<Story isolated={true}></Story>}
          ></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

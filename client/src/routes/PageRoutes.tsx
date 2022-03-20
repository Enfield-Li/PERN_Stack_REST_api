import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreatePost from "../components/CreatePost";
import EditPost from "../components/EditPost";
import Login from "../components/Login";
import MainContents from "../components/MainContents";
import PostPage from "../components/Post";
import Register from "../components/register";
import UserProfile from "../components/UserProfile";

interface PageRoutesProps {}

const PageRoutes: React.FC<PageRoutesProps> = ({}) => {
  const location = useLocation();

  return (
    <div className="container">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {location.pathname === "/" ? (
          <Route path="/" element={<MainContents />} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/post/edit/:id" element={<EditPost />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default PageRoutes;

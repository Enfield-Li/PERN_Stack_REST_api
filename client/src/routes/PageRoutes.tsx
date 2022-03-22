import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreatePost from "../components/post/create-edit/CreatePost";
import Login from "../components/landing/Login";
import MainContents from "../components/MainContents";
import PostPage from "../components/post/Post";
import Register from "../components/landing/register";
import UserProfile from "../components/user-related/UserProfile";
import EditPost from "../components/post/create-edit/EditPost";

interface PageRoutesProps {}

const PageRoutes: React.FC<PageRoutesProps> = ({}) => {
  const location = useLocation();

  return (
    <div className="container">
      {/* Init Toast */}
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

      {/* Routes */}
      <Routes>
        {location.pathname === "/" ? (
          <Route path="/" element={<MainContents />} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/edit/:id" element={<EditPost />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default PageRoutes;

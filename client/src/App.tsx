import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import MainContents from "./components/MainContents";
import Navbar from "./components/Navbar";
import PostPage from "./components/Post";
import Register from "./components/register";
import {
  getUserProfile,
  me,
  useUser,
} from "./contexts/User/actions/UserAction";
import {
  fetchPaginatedPosts,
  usePost,
} from "./contexts/Post/actions/PostAction";
import EditPost from "./components/EditPost";
import UserProfile from "./components/UserProfile";

function App() {
  const location = useLocation();
  const [userState, userDispatch] = useUser();
  const [postState, postDispatch] = usePost();

  console.log(
    "userProfile: ",
    userState.userProfile?.userPaginatedPost.postAndInteractions
  );

  // console.log("currentPost: ", postState.currentPost);
  // console.log("posts: ", postState.paginatedPosts.postAndInteractions);

  useEffect(() => {
    me(userDispatch);
    fetchPaginatedPosts(postDispatch);
  }, []);

  return (
    <div style={{ backgroundColor: "#dae0e6" }}>
      <div className="bg-white">
        <Navbar />
      </div>
      <div className="container">
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
    </div>
  );
}

export default App;

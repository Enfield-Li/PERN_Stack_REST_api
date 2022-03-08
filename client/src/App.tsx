import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import MainContents from "./components/MainContents";
import Navbar from "./components/Navbar";
import PostPage from "./components/Post";
import Register from "./components/register";
import { me, useUser } from "./contexts/User/actions/UserAction";
import {
  fetchPaginatedPosts,
  usePost,
} from "./contexts/Post/actions/PostAction";

function App() {
  const location = useLocation();

  const [_, userDispatch] = useUser();
  const [postState, postDispatch] = usePost();

  console.log("post: ", postState.paginatedPosts.postAndInteractions);

  useEffect(() => {
    const fetchPostsAndMe = async () => {
      await me(userDispatch);
      await fetchPaginatedPosts(postDispatch);
    };

    fetchPostsAndMe();
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
              <Route path="/post/:id" element={<PostPage />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;

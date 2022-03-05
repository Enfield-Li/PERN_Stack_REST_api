import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import MainContents from "./components/MainContents";
import Navbar from "./components/Navbar";
import PostDataType from "./components/Post";
import Register from "./components/register";
import { me, useUser } from "./contexts/User/actions/UserAction";
import { fetchAllPosts, usePost } from "./contexts/Post/actions/PostAction";
import { FETCH_ALL_POSTS } from "./contexts/constant";

function App() {
  const location = useLocation();

  const [userState, userDispatch] = useUser();
  const [postState, postDispatch] = usePost();

  useEffect(() => {
    const getPosts = async () => {
      await me(userDispatch);
      const res = await fetchAllPosts();

      postDispatch({
        type: FETCH_ALL_POSTS,
        payload: res,
      });
    };

    getPosts();
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
              <Route path="/post/:id" element={<PostDataType />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;

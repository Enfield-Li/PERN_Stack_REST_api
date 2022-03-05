import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import MainContents from "./components/MainContents";
import Navbar from "./components/Navbar";
import PostDataType from "./components/Post";
import Register from "./components/register";
import { fetchAllPosts, me, useGlobal } from "./context/actions/action";
import { FETCH_ALL_POSTS } from "./context/types/constant";

function App() {
  const location = useLocation();

  const [state, dispatch] = useGlobal();
  useEffect(() => {
    const getPosts = async () => {
      await me(dispatch);
      const res = await fetchAllPosts();

      dispatch({
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

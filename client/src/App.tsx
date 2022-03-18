import { useEffect } from "react";
import { io } from "socket.io-client";
import Navbar from "./components/Navbar";
import {
  fetchPaginatedPosts,
  usePost,
} from "./contexts/Post/actions/PostAction";
import { useSocket } from "./contexts/SocketIo/actions/useSocket";
import { me, useUser } from "./contexts/User/actions/UserAction";
import PageRoutes from "./PageRoutes";

function App() {
  const [userState, userDispatch] = useUser();
  const [postState, postDispatch] = usePost();
  const { socket, setSocket } = useSocket();

  useEffect(() => {
    me(userDispatch);
    fetchPaginatedPosts(postDispatch);
    setSocket(io("http://localhost:3119", { withCredentials: true }));
  }, []);

  useEffect(() => {
    socket?.emit("MsgToServer", { msg: "hello world from client" });

    socket?.on("MsgToClient", (data) => {
      console.log("MsgToClient: ", data);
    });
  }, [socket]);

  return (
    <div style={{ backgroundColor: "#dae0e6" }}>
      <div className="bg-white">
        <Navbar />
      </div>
      <PageRoutes />
    </div>
  );
}

export default App;

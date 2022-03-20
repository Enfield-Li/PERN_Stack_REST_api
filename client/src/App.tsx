import { useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./components/experiment/Chat";
import Navbar from "./components/Navbar";
import {
  fetchPaginatedPosts,
  usePost,
} from "./contexts/Post/actions/PostAction";
import { useSocket } from "./contexts/SocketIo/actions/useSocket";
import { me, useUser } from "./contexts/User/actions/UserAction";
import PageRoutes from "./routes/PageRoutes";

function App() {
  const [userState, userDispatch] = useUser();
  const [postState, postDispatch] = usePost();
  const { socket, setSocket } = useSocket();

  useEffect(() => {
    me(userDispatch);
    fetchPaginatedPosts(postDispatch);

    const connectSocket = io("http://localhost:3119");

    setSocket(connectSocket);
  }, []);

  useEffect(() => {
    if (userState.user) socket?.emit("Login", userState.user?.id);
  }, [socket, userState]);

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
        <Chat />
      </div>
      <PageRoutes />
    </div>
  );
}

export default App;

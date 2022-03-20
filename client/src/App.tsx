import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "./components/Navbar";
import {
  fetchPaginatedPosts,
  usePost,
} from "./contexts/Post/actions/PostAction";
import { receiveNotification } from "./contexts/SocketIo/actions/socketActions";
import { useSocket } from "./contexts/SocketIo/actions/useSocket";
import { me, useUser } from "./contexts/User/actions/UserAction";
import PageRoutes from "./routes/PageRoutes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userState, userDispatch] = useUser();
  const [postState, postDispatch] = usePost();
  const { socket, setSocket, notifications, setNotifications } = useSocket();

  // Initialize login, fetch posts, socket connection
  useEffect(() => {
    me(userDispatch);
    fetchPaginatedPosts(postDispatch);

    const connectSocket = io("http://localhost:3119");
    setSocket(connectSocket);
  }, []);

  // Create user instance in socket server
  useEffect(() => {
    if (userState.user) socket?.emit("Login", userState.user?.id);
  }, [socket, userState]);

  // Capture socket response
  useEffect(() => {
    receiveNotification(socket, setNotifications);
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

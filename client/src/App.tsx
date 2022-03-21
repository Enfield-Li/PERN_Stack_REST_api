import { useEffect, useState } from "react";
import "./app.css";
import { io } from "socket.io-client";
import Navbar from "./components/Navbar";
import {
  fetchPaginatedPosts,
  usePost,
} from "./contexts/Post/actions/PostAction";
import {
  fetchInteractives,
  receiveNotification,
  useSocket,
} from "./contexts/SocketIo/actions/socketActions";
import { me, useUser } from "./contexts/User/actions/UserAction";
import PageRoutes from "./routes/PageRoutes";
import "react-toastify/dist/ReactToastify.css";
import "react-popper-tooltip/dist/styles.css";
import { ReceiveNotification } from "./contexts/SocketIo/types/socketTypes";
import { toast } from "react-toastify";

function App() {
  const { userState, userDispatch } = useUser();
  const { postDispatch } = usePost();
  const { socket, setSocket, socketDispatch, setUncheckedAmount, socketState } =
    useSocket();
  const [notifications, setNotifications] = useState<ReceiveNotification[]>([]);

  // Initialize login, fetch posts, socket connection, interactives
  useEffect(() => {
    me(userDispatch);
    fetchPaginatedPosts(postDispatch);

    const connectSocket = io("http://localhost:3119");
    setSocket(connectSocket);
  }, []);

  useEffect(() => {
    if (userState.user) {
      fetchInteractives(socketDispatch, setUncheckedAmount);
    }
  }, [userState.user]);

  // Create user instance in socket server
  useEffect(() => {
    if (userState.user) socket?.emit("Login", userState.user?.id);
  }, [socket, userState.user]);

  // Capture socket response
  useEffect(() => {
    receiveNotification(
      socket,
      socketDispatch,
      setNotifications,
      setUncheckedAmount
    );
  }, [socket]);

  // Notify with toast when receive interactions
  useEffect(() => {
    if (notifications[0]) {
      const event = notifications[0];
      let action = "";
      if (event.type === "laugh") action = "😄";
      if (event.type === "vote") action = "⇧";
      if (event.type === "like") action = "❤";

      const text = `Receive a ${action} from ${event.senderName}!`;

      const notify = () => toast(text);

      notify();
    }
  }, [notifications]);

  return (
    <div style={{ background: "#dae0e6" }}>
      <div className="bg-white">
        <Navbar />
      </div>

      <PageRoutes />
    </div>
  );
}

export default App;

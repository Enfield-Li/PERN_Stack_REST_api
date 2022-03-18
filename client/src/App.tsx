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
<<<<<<< HEAD
    // socket?.emit("MsgToServer", { msg: "hello world from client" });
    // socket?.on("MsgToClient", (data) => {
    //   console.log("MsgToClient: ", data);
    // });

    socket?.emit("Login", userState.user?.id);
  }, [socket, userState]);
=======
    socket?.emit("message", { msg: "msg here" });
    socket?.on("message", (data: any) => {
      console.log("data from server: ", data);
    });
  }, [socket]);
>>>>>>> 6a6ab5e36092ee1feef45de6a9459759a8ef1eb0

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

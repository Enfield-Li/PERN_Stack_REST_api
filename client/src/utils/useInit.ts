import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import {
  usePost,
  fetchPaginatedPosts,
} from "../contexts/Post/actions/PostAction";
import {
  useSocket,
  fetchInteractives,
  receiveNotification,
} from "../contexts/SocketIo/actions/socketActions";
import { ReceiveNotification } from "../contexts/SocketIo/types/socketTypes";
import { useUser, me } from "../contexts/User/actions/UserAction";
import { toastNotify } from "./toastNotify";

export function useInit() {
  const { userState, userDispatch } = useUser();
  const { postDispatch } = usePost();
  const { socket, setSocket, socketDispatch, setUncheckedAmount } = useSocket();
  const location = useLocation();

  // Initialize login, fetch posts, socket connection, interactives
  useEffect(() => {
    me(userDispatch);
    if (location.pathname === "/") fetchPaginatedPosts(postDispatch);

    const connectSocket = io("http://localhost:3119");
    setSocket(connectSocket);
  }, []);

  // Once login, fetch user's interactivties
  useEffect(() => {
    if (userState.user) {
      fetchInteractives(socketDispatch, setUncheckedAmount);
    }
  }, [userState.user]);

  // Create user instance in socket server
  useEffect(() => {
    if (userState.user) socket?.emit("Login", userState.user?.id);
  }, [socket, userState.user]);

  // For invoking Toast notifications
  const [toastNotifications, setToastNotifications] = useState<
    ReceiveNotification[]
  >([]);

  // Capture socket response
  useEffect(() => {
    receiveNotification(
      socket,
      socketDispatch,
      setToastNotifications,
      setUncheckedAmount
    );
  }, [socket]);

  // Notify with toast after receiving interactions
  useEffect(() => {
    if (toastNotifications[0]) {
      const event = toastNotifications[0];

      let action = "";
      if (event.type === "laugh") action = "😄";
      if (event.type === "vote") action = "⬆️";
      if (event.type === "like") action = "❤";

      const text = `Receive a ${action} from ${event.senderName}!`;

      toastNotify(text);
    }
  }, [toastNotifications]);
}

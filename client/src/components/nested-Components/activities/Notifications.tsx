import React from "react";
import { toast } from "react-toastify";
import { fetchInteractives } from "../../../contexts/SocketIo/actions/socketActions";
import { useSocket } from "../../../contexts/SocketIo/actions/useSocket";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { notifications, setNotifications, setInteractives } = useSocket();
  const latestNotifications = notifications[0];

  return (
    <i
      role="button"
      className="bi bi-bell position-relative mx-4 fs-3"
      onClick={() => {
        setNotifications([]);
        fetchInteractives(setInteractives);
      }}
    >
      <span className="fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {notifications.length ? notifications.length : null}
      </span>
    </i>
  );
};

export default Notifications;

import React from "react";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({}) => {
  return (
    <i role="button" className="bi bi-bell position-relative mx-4 fs-3">
      <span className="fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        3
      </span>
    </i>
  );
};

export default Notifications;

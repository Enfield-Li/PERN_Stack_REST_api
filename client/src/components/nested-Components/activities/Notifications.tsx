import React, { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { fetchInteractives } from "../../../contexts/SocketIo/actions/socketActions";
import { useSocket } from "../../../contexts/SocketIo/actions/useSocket";
import Interacitivities from "./Interacitivities";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { notifications, setNotifications, setInteractives } = useSocket();

  const [decoration, setDecoration] = useState(false);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "click",
    delayHide: 100,
    placement: "bottom",
    closeOnOutsideClick: true,
  });

  return (
    <div>
      <div
        role="button"
        ref={setTriggerRef}
        className="bi bi-bell position-relative mx-4 fs-3"
        onClick={() => {
          setNotifications([]);
          fetchInteractives(setInteractives);
        }}
      >
        <span className="fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {notifications.length ? notifications.length : null}
        </span>
      </div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
          <Interacitivities />
        </div>
      )}
    </div>
  );
};

export default Notifications;

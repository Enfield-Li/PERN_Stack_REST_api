import React from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import {
  clearNotifications,
  fetchInteractives,
  useSocket,
} from "../../../contexts/SocketIo/actions/socketActions";
import Interacitivities from "./Interacitivities";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { socketState, socketDispatch } = useSocket();
  const { notifications } = socketState;

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
          clearNotifications(socketDispatch);
          fetchInteractives(socketDispatch);
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

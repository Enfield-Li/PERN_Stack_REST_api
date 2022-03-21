import React, { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import {
  clearNotifications,
  fetchInteractives,
  setPostChecked,
  useSocket,
} from "../../../contexts/SocketIo/actions/socketActions";
import { collectPostToBeChecked } from "../../../utils/collectPostToBeChecked";
import Interacitivities from "./Interacitivities";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { socketState, socketDispatch, uncheckedAmount, setUncheckedAmount } =
    useSocket();

  // Controlled tool tip
  const [controlledVisible, setControlledVisible] = useState(false);
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
    interactive: true,
    closeOnOutsideClick: true,
    visible: controlledVisible,
    onVisibleChange: setControlledVisible,
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
          setUncheckedAmount(0);

          const formatedPosts = collectPostToBeChecked(
            socketState.interactives
          );

          if (formatedPosts.length) setPostChecked(formatedPosts);
        }}
      >
        <span className="fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {uncheckedAmount ? uncheckedAmount : null}
        </span>
      </div>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <Interacitivities />
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
        </div>
      )}

      {/* <button onClick={() => setControlledVisible(!controlledVisible)}>
        External control
      </button> */}
    </div>
  );
};

export default Notifications;

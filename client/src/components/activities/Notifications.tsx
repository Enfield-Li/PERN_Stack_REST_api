import React, { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import {
  clearNotifications,
  fetchInteractives,
  setServerNotificationCheckedOrRead,
  useSocket,
} from "../../contexts/SocketIo/actions/socketActions";
import { collectPostToBeCheckedOrRead } from "../../utils/collectPostToBeChecked";
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

  const clickBellButton = () => {
    // Update client cache
    clearNotifications(socketDispatch);
    fetchInteractives(socketDispatch);
    setUncheckedAmount(0);

    // Update server data
    const formatedPosts = collectPostToBeCheckedOrRead(
      socketState.interactives,
      true
    );
    if (formatedPosts.length)
      setServerNotificationCheckedOrRead(formatedPosts, true);
  };

  return (
    <div>
      {/* bell button */}
      <div
        role="button"
        ref={setTriggerRef}
        className="bi bi-bell position-relative mx-4 fs-3"
        onClick={() => clickBellButton()}
      >
        <span className="fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {uncheckedAmount ? uncheckedAmount : null}
        </span>
      </div>

      {/* tool tips */}
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <Interacitivities />
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
        </div>
      )}
    </div>
  );
};

export default Notifications;

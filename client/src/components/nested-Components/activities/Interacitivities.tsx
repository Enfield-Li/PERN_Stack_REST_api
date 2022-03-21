import React, { useEffect } from "react";
import {
  setAllInteractivesRead,
  setInteractiveRead,
  useSocket,
} from "../../../contexts/SocketIo/actions/socketActions";

interface InteracitivitiesProps {}

const Interacitivities: React.FC<InteracitivitiesProps> = ({}) => {
  const { socketState, socketDispatch, setUncheckedAmount } = useSocket();
  const { interactives } = socketState;

  return (
    <div style={{ height: 300, width: 340, overflow: "scroll" }}>
      <button
        role="button"
        className="btn btn-primary"
        onClick={() => {
          setAllInteractivesRead(socketDispatch);
        }}
      >
        Set all read
      </button>
      {interactives.map((interactive, index) => (
        <div
          key={index}
          role="button"
          onClick={() => {
            setInteractiveRead(interactive.postId, socketDispatch);
          }}
        >
          <div>Receive</div>
          <span>checked: {interactive.checked ? "true" : "false"} </span>
          <span>read: {interactive.read ? "true" : "false"} </span>
          <div>
            {interactive.laughStatus && <span>laughter </span>}
            {interactive.voteStatus && <span>upvote </span>}
            {interactive.likeStatus && <span>likes </span>}
            <span>from {interactive.user.username} </span>
            on {interactive.post.title}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Interacitivities;

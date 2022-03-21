import React from "react";
import { useSocket } from "../../../contexts/SocketIo/actions/socketActions";

interface InteracitivitiesProps {}

const Interacitivities: React.FC<InteracitivitiesProps> = ({}) => {
  const { socketState } = useSocket();
  const { interactives } = socketState;

  return (
    <div style={{ height: 300, width: 340, overflow: "scroll" }}>
      {interactives.map((interactive, index) => (
        <div key={index} role="button" onClick={() => console.log("clicked")}>
          <div>Receive</div>
          <span>checked: {interactive.checked ? "true" : "false"} </span>
          <span>read: {interactive.read ? "true" : "false"} </span>
          <div>
            {interactive.laughStatus && <span>laughter </span>}
            {interactive.voteStatus && <span>upvote </span>}
            {interactive.likeStatus && <span>likes </span>}
            <span>from {interactive.user.username}</span>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Interacitivities;

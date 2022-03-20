import React from "react";
import { useSocket } from "../../../contexts/SocketIo/actions/useSocket";

interface InteracitivitiesProps {}

const Interacitivities: React.FC<InteracitivitiesProps> = ({}) => {
  const { interactives, setInteractives } = useSocket();

  return (
    <div style={{ height: 300, width: 340, overflow: "scroll" }}>
      {interactives.map((interactive, index) => (
        <div key={index}>
          <div>Receive</div>
          {interactive.laughStatus && <span>laughter </span>}
          {interactive.voteStatus && <span>upvote </span>}
          {interactive.likeStatus && <span>likes </span>}
          <span>from {interactive.user.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Interacitivities;

import React from "react";
import {
  setAllInteractivesRead,
  setClientInteractionRead,
  setServerInteractionRead,
  setServerNotificationCheckedOrRead,
  useSocket,
} from "../../contexts/SocketIo/actions/socketActions";
import { Interactive } from "../../contexts/SocketIo/types/socketTypes";
import { collectPostToBeCheckedOrRead } from "../../utils/collectPostToBeChecked";

interface InteracitivitiesProps {}

const Interacitivities: React.FC<InteracitivitiesProps> = ({}) => {
  const { socketState, socketDispatch } = useSocket();
  const { interactives } = socketState;

  const setAllCheckedOrRead = () => {
    // Update client cache
    setAllInteractivesRead(socketDispatch);

    // Update server data
    const formatedPosts = collectPostToBeCheckedOrRead(
      socketState.interactives,
      false
    );
    if (formatedPosts.length)
      setServerNotificationCheckedOrRead(formatedPosts, false);
  };

  const setSingleRead = (interactive: Interactive) => {
    // Update client cache
    const { userId, postId } = interactive;
    setClientInteractionRead(postId, userId, socketDispatch);

    // Update server data
    setServerInteractionRead({ postId, userId });
  };

  return (
    <div style={{ height: 300, width: 340, overflow: "scroll" }}>
      {/* Set all read */}
      <button
        role="button"
        className="btn btn-primary"
        onClick={() => setAllCheckedOrRead()}
      >
        Set all read
      </button>

      {/* tool tips */}
      {interactives.map((interactive, index) => (
        <div
          key={index}
          role="button"
          onClick={() => setSingleRead(interactive)}
        >
          <div>{interactive.postId} Receive</div>
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

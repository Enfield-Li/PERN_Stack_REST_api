import React from "react";
import {
  setAllInteractivesRead,
  setClientInteractionRead,
  setServerInteractionRead,
  setServerNotificationCheckedOrRead,
  useSocket,
} from "../../contexts/SocketIo/actions/socketActions";
import { Interactive } from "../../contexts/SocketIo/types/socketTypes";
import { calculateTime } from "../../utils/calculaTime";
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
      <div className="d-flex justify-content-between align-items-center px-2 py-1">
        <h4>Notifications</h4>

        {/* Set all read */}
        <i
          className="bi bi-check-square fs-3"
          role="button"
          onClick={() => setAllCheckedOrRead()}
        ></i>
      </div>

      {/* tool tips */}
      {interactives.map((interactive) => (
        <div
          key={`postId${interactive.postId}-userId${interactive.userId}`}
          role="button"
          onClick={() => setSingleRead(interactive)}
          style={{ background: interactive.read ? "" : "#e9f5fd" }}
          className="d-flex p-2"
        >
          <div>
            <i className="bi bi-person fs-2 me-2"></i>
          </div>

          <div>
            <div className="my-2">
              {interactive.laughStatus && <span>😄 </span>}
              {interactive.voteStatus && <span>⬆️ </span>}
              {interactive.likeStatus && <span>❤ </span>}!
              <span className="text-muted">
                · {calculateTime(interactive.createdAt, true)}
              </span>
            </div>
            <div className="text-muted">
              Go see your post "{interactive.post.title.slice(0, 8)}..."
            </div>
            {/* <span>from {interactive.user.username} </span>
              on {interactive.post.title} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Interacitivities;

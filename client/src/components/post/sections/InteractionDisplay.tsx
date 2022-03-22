import { useNavigate } from "react-router-dom";
import {
  usePost,
  interactWithPost,
} from "../../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../../contexts/Post/types/PostTypes";
import {
  useSocket,
  sendNotification,
} from "../../../contexts/SocketIo/actions/socketActions";
import {
  useUser,
  interactWithPostFromUserProfile,
} from "../../../contexts/User/actions/UserAction";
import { UserPostAndInteractions } from "../../../contexts/User/types/UserTypes";

interface InteractionDisplayProps {
  postAndInteractions: PostAndInteractions | UserPostAndInteractions;
  isInProfile?: boolean;
}

const InteractionDisplay: React.FC<InteractionDisplayProps> = ({
  postAndInteractions,
  isInProfile = false,
}) => {
  const userInteractions = postAndInteractions.interactions;
  const { postDispatch } = usePost();
  const { userState, userDispatch } = useUser();
  const navigate = useNavigate();
  const { socket } = useSocket();

  const { user } = userState;
  const post = postAndInteractions.post;

  const interact = (field: "like" | "laugh" | "confused") => {
    if (!user) {
      navigate("/login");
      return;
    }

    sendNotification(socket, {
      postId: post.id,
      reciverId: post.userId,
      senderId: user.id,
      value: true,
      senderName: user.username,
      type: field,
    });

    if (isInProfile) {
      interactWithPostFromUserProfile(userDispatch, post.id, true, field);

      return;
    }

    interactWithPost(postDispatch, post.id, true, field);
  };

  return (
    <div className="d-flex mt-2">
      {/* like */}
      {post.likePoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            userInteractions?.likeStatus ? "border-info" : "border-dark"
          }`}
          onClick={() => interact("like")}
        >
          <div className="mx-1">❤</div>
          <div
            className={`mx-1 me-2 ${
              userInteractions?.likeStatus ? "text-info" : "text-dark"
            }`}
          >
            {post.likePoints}
          </div>
        </div>
      ) : null}

      {/* laugh */}
      {post.laughPoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            userInteractions?.laughStatus ? "border-info" : "border-dark"
          }`}
          onClick={() => interact("laugh")}
        >
          <div className="mx-1">😄</div>
          <div
            className={`mx-1 me-2 ${
              userInteractions?.laughStatus ? "text-info" : "text-dark"
            }`}
          >
            {post.laughPoints}
          </div>
        </div>
      ) : null}

      {/* confused */}
      {post.confusedPoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            userInteractions?.confusedStatus ? "border-info" : "border-dark"
          }`}
          onClick={() => interact("confused")}
        >
          <div className="mx-1">😕</div>
          <div
            className={`mx-1 me-2 ${
              userInteractions?.confusedStatus ? "text-info" : "text-dark"
            }`}
          >
            {post.confusedPoints}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InteractionDisplay;

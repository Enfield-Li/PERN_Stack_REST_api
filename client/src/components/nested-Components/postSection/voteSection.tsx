import React from "react";
import { useNavigate } from "react-router-dom";
import {
  interactWithPost,
  usePost,
} from "../../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../../contexts/Post/types/PostTypes";
import {
  sendNotification,
  useSocket,
} from "../../../contexts/SocketIo/actions/socketActions";
import {
  interactWithPostFromUserProfile,
  useUser,
} from "../../../contexts/User/actions/UserAction";
import { UserPostAndInteractions } from "../../../contexts/User/types/UserTypes";

interface VoteSectionProps {
  postAndInteractions: PostAndInteractions | UserPostAndInteractions;
  isInProfile?: boolean;
}

const VoteSection: React.FC<VoteSectionProps> = ({
  postAndInteractions,
  isInProfile = false,
}) => {
  const { postDispatch } = usePost();
  const { userState, userDispatch } = useUser();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const { user } = userState;
  const post = postAndInteractions.post;
  const postId = post.id;
  const interactions = postAndInteractions.interactions;

  const vote = (voteValue: boolean) => {
    if (!user) {
      navigate("/login");
      return;
    }

    sendNotification(socket, {
      postId,
      reciverId: post.userId,
      senderId: user.id,
      value: voteValue,
      senderName: user.username,
      type: "vote",
    });

    if (isInProfile) {
      interactWithPostFromUserProfile(userDispatch, postId, voteValue, "vote");
      return;
    }

    interactWithPost(postDispatch, postId, voteValue, "vote");
  };

  return (
    <div className="me-3 mt-2">
      <button
        className={`bi bi-caret-up btn ${
          interactions?.voteStatus === true ? "bg-info" : ""
        }`}
        onClick={() => vote(true)}
      />
      <div className="text-center">{post.votePoints}</div>
      <button
        className={`bi bi-caret-down btn  ${
          interactions?.voteStatus === false ? "bg-danger" : ""
        }`}
        onClick={() => vote(false)}
      />
    </div>
  );
};

export default VoteSection;

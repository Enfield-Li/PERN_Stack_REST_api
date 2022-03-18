import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  interactWithPost,
  usePost,
} from "../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { sendNotification } from "../../contexts/SocketIo/actions/socketActions";
import { useSocket } from "../../contexts/SocketIo/actions/useSocket";
import {
  interactWithPostFromUserProfile,
  useUser,
} from "../../contexts/User/actions/UserAction";
import { UserPostAndInteractions } from "../../contexts/User/types/UserTypes";

interface VoteSectionProps {
  postAndInteractions: PostAndInteractions | UserPostAndInteractions;
  isInProfile?: boolean;
}

const VoteSection: React.FC<VoteSectionProps> = ({
  postAndInteractions,
  isInProfile = false,
}) => {
  const [_, postDispatch] = usePost();
  const [{ user }, userDispatch] = useUser();
  const navigate = useNavigate();
  const { socket, setSocket } = useSocket();

  const post = postAndInteractions.post;
  const postId = post.id;
  const interactions = postAndInteractions.interactions;

  const vote = (bool: boolean) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInProfile) {
      interactWithPostFromUserProfile(userDispatch, postId, bool, "vote");
      return;
    }

    interactWithPost(postDispatch, postId, bool, "vote");

    sendNotification(socket, {
      postId,
      reciverId: post.userId,
      senderId: user.id,
      value: bool,
      senderName: user.username,
    });

    socket?.on("ReceiveNotification", (data) => {
      console.log("ReceiveNotification", data);
    });

    socket?.on("SendNotification", (data) => {
      console.log("SendNotification", data);
    });
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

import { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { Link } from "react-router-dom";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { getUserInfo, useUser } from "../../contexts/User/actions/UserAction";
import {
  UserPostAndInteractions,
  User,
} from "../../contexts/User/types/UserTypes";
import { calculateTime } from "../../utils/calculaTime";
import ProfileCardPlaceholder from "../placeholders/ProfileCardPlaceholder";

import ProfileCard from "./ProfileCard";

interface PostCreatorInfoProps {
  postAndInteractions: PostAndInteractions | UserPostAndInteractions;
}

const PostCreatorInfo: React.FC<PostCreatorInfoProps> = ({
  postAndInteractions,
}) => {
  const { userState } = useUser();
  const meId = userState.user?.id;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const postCreator = postAndInteractions.post.user;

  const [textDecoration, setTextDecoration] = useState(false);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "hover",
    delayHide: 100,
    interactive: true,
    placement: "right",
  });

  const hoverToFetchUserInfo = async () => {
    setTextDecoration(true);
    const user = await getUserInfo(postAndInteractions.post.user!.id);
    setCurrentUser(user);
  };

  return (
    <div className="fs-6 fw-lighter mt-2">
      Posted
      {postCreator && (
        <span
          onMouseOver={async () => hoverToFetchUserInfo()}
          onMouseLeave={() => setTextDecoration(false)}
        >
          {/* Controlls */}
          <span role="button" ref={setTriggerRef}>
            <span> by </span>
            <span
              role="button"
              className={`fw-light text-dark ${
                textDecoration
                  ? "text-decoration-underline"
                  : "text-decoration-none"
              }`}
            >
              <Link
                to={`/user-profile/${postAndInteractions.post.user.id}`}
                style={{ color: "black", textDecoration: "none" }}
                role="button"
              >
                {postCreator.username}
              </Link>
            </span>
          </span>

          {/* Popups */}
          {visible && (
            <div
              ref={setTooltipRef}
              {...getTooltipProps({ className: "tooltip-container" })}
            >
              <div {...getArrowProps({ className: "tooltip-arrow" })} />
              <div>
                {currentUser ? (
                  <ProfileCard
                    user={currentUser}
                    isMe={meId === postCreator.id}
                  />
                ) : (
                  <ProfileCardPlaceholder />
                )}
              </div>
            </div>
          )}
        </span>
      )}
      {/* Create time */}
      <span className="ms-2 fw-lighter">
        {calculateTime(postAndInteractions.post.createdAt)}
      </span>
    </div>
  );
};
export default PostCreatorInfo;

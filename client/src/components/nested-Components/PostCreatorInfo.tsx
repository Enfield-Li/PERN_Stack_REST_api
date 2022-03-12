import { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { Link } from "react-router-dom";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { getUserInfo } from "../../contexts/User/actions/UserAction";
import {
  User,
  UserPostAndInteractions,
} from "../../contexts/User/types/UserTypes";
import { calculateTime } from "../../utils/calculaTime";

interface PostCreatorInfoProps {
  postAndInteractions: PostAndInteractions | UserPostAndInteractions;
}

const PostCreatorInfo: React.FC<PostCreatorInfoProps> = ({
  postAndInteractions,
}) => {
  const [user, setuser] = useState<User | null>(null);

  const [decoration, setDecoration] = useState(false);
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
    // delayShow: 50,
  });

  console.log(user);

  return (
    <div className="fs-6 fw-lighter mt-2">
      Posted
      {postAndInteractions.post.user && (
        <span
          onMouseOver={async () => {
            setDecoration(true);

            const user = await getUserInfo(postAndInteractions.post.userId);

            setuser(user);
          }}
          onMouseLeave={() => setDecoration(false)}
        >
          <span role="button" ref={setTriggerRef}>
            <span> by </span>
            <span
              role="button"
              className={`fw-light text-dark ${
                decoration
                  ? "text-decoration-underline"
                  : "text-decoration-none"
              }`}
            >
              <Link
                to={`/user-profile/${postAndInteractions.post.userId}`}
                style={{ color: "black", textDecoration: "none" }}
                role="button"
              >
                {postAndInteractions.post.user.username}
              </Link>
            </span>
          </span>
          {visible && (
            <div ref={setTooltipRef} {...getTooltipProps({ className: "" })}>
              <div {...getArrowProps({ className: "tooltip-arrow" })} />
              <div>
                {user
                  ? ""
                  : // <ProfileCard user={user}  />
                    null}
              </div>
            </div>
          )}
        </span>
      )}
      <span className="ms-2 fw-lighter">
        {calculateTime(postAndInteractions.post.createdAt)}
      </span>
    </div>
  );
};
export default PostCreatorInfo;

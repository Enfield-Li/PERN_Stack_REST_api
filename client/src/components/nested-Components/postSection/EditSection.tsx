import { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  deletePost,
  interactWithPost,
  usePost,
} from "../../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../../contexts/Post/types/PostTypes";
import {
  interactWithPostFromUserProfile,
  useUser,
} from "../../../contexts/User/actions/UserAction";
import { UserPostAndInteractions } from "../../../contexts/User/types/UserTypes";

interface EditSectionProps {
  postAndInteractions: PostAndInteractions | UserPostAndInteractions;
  isNotMain: boolean;
  isInProfile?: boolean;
}

const EditSection: React.FC<EditSectionProps> = ({
  postAndInteractions,
  isNotMain,
  isInProfile = false,
}) => {
  const { postDispatch } = usePost();
  const { userState, userDispatch } = useUser();

  const { user } = userState;
  const navigate = useNavigate();

  const [controlledVisible, setControlledVisible] = useState(false);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "click",
    closeOnOutsideClick: true,
    visible: controlledVisible,
    onVisibleChange: setControlledVisible,
  });

  const notify = () => toast("Post deleted");

  const interact = (field: "like" | "laugh" | "confused") => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInProfile) {
      interactWithPostFromUserProfile(
        userDispatch,
        postAndInteractions.post.id,
        true,
        field
      );
      return;
    }

    interactWithPost(postDispatch, postAndInteractions.post.id, true, field);
  };

  return (
    <div className="d-flex flex-column">
      <div
        role="button"
        className="bi bi-three-dots text-success me-1"
        ref={setTriggerRef}
      ></div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "card bg-info" })}
        >
          <div className="card-body">
            <div {...getArrowProps({ className: "tooltip-arrow" })} />

            <span className="d-flex">
              {/* like */}
              <div
                role="button"
                className={`me-2 ${
                  postAndInteractions.interactions?.likeStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => interact("like")}
              >
                ❤
              </div>

              {/* laugh */}
              <span
                role="button"
                className={`me-2 ${
                  postAndInteractions.interactions?.laughStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => interact("laugh")}
              >
                😄
              </span>

              {/* confused */}
              <span
                role="button"
                className={`${
                  postAndInteractions.interactions?.confusedStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => interact("confused")}
              >
                😕
              </span>
            </span>
          </div>
        </div>
      )}

      {/* show edit/delete button or not */}
      {postAndInteractions.post.user &&
        (user?.username === postAndInteractions.post.user.username ? (
          <div className="mt-1 d-flex flex-column">
            {/* edit */}
            <span
              role="button"
              className="text-decoration-none"
              onClick={() => {
                const url = isNotMain
                  ? `/post/edit/${postAndInteractions.post.id}`
                  : `/post/${postAndInteractions.post.id}`;

                navigate(url);
              }}
            >
              📝
            </span>

            {/* delete */}
            <span
              role="button"
              className="mt-2 text-decoration-none"
              onClick={() => {
                if (isNotMain) {
                  deletePost(postDispatch, postAndInteractions.post.id);
                  navigate("/");
                  notify();
                } else {
                  navigate(`/post/${postAndInteractions.post.id}`);
                }

                return;
              }}
            >
              <i className="bi bi-trash3"></i>
            </span>
          </div>
        ) : null)}
    </div>
  );
};
export default EditSection;

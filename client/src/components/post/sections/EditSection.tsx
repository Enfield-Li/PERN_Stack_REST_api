import { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  usePost,
  interactWithPost,
  deletePost,
} from "../../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../../contexts/Post/types/PostTypes";
import {
  useUser,
  interactWithPostFromUserProfile,
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

  const postId = postAndInteractions.post.id;
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
    interactive: true,
  });

  const notify = () => toast("Post deleted");

  const interact = (field: "like" | "laugh" | "confused") => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInProfile) {
      interactWithPostFromUserProfile(userDispatch, postId, true, field);
      return;
    }

    interactWithPost(postDispatch, postId, true, field);
  };

  const editPost = () => {
    // Post can only be edited in post page
    // not in main page
    const url = isNotMain ? `/post/edit/${postId}` : `/post/${postId}`;
    navigate(url);
  };

  const deleteP = () => {
    // Post can only be deleted in post page
    // not in main page
    if (isNotMain) {
      deletePost(postDispatch, postId);
      navigate("/");
      notify();
    } else {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className="d-flex flex-column">
      {/* option button */}
      <div
        role="button"
        className="bi bi-three-dots text-success me-1"
        ref={setTriggerRef}
      ></div>

      {/* tool tip */}
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container card bg-info" })}
        >
          <div className="card-body">
            <div {...getArrowProps({ className: "tooltip-arrow" })} />

            <span className="d-flex">
              {/* like */}
              <div
                role="button"
                className={`me-2 fs-5${
                  postAndInteractions.interactions?.likeStatus
                    ? " bg-secondary rounded"
                    : ""
                }`}
                onClick={() => interact("like")}
              >
                ❤
              </div>

              {/* laugh */}
              <span
                role="button"
                className={`me-2 fs-5${
                  postAndInteractions.interactions?.laughStatus
                    ? " bg-secondary rounded"
                    : ""
                }`}
                onClick={() => interact("laugh")}
              >
                😄
              </span>

              {/* confused */}
              <span
                role="button"
                className={`fs-5${
                  postAndInteractions.interactions?.confusedStatus
                    ? " bg-secondary rounded"
                    : ""
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
              onClick={() => editPost()}
            >
              📝
            </span>

            {/* delete */}
            <span
              role="button"
              className="mt-2 text-decoration-none"
              onClick={() => deleteP()}
            >
              <i className="bi bi-trash3"></i>
            </span>
          </div>
        ) : null)}
    </div>
  );
};
export default EditSection;

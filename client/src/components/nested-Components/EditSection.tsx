import { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  interactWithPost,
  usePost,
} from "../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { useUser } from "../../contexts/User/actions/UserAction";

interface EditSectionProps {
  postAndInteraction: PostAndInteractions;
  isNotMain: boolean;
}

const EditSection: React.FC<EditSectionProps> = ({
  postAndInteraction,
  isNotMain,
}) => {
  const [_, postDispatch] = usePost();
  const [userState] = useUser();
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
                  postAndInteraction.interactions?.likeStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (!userState.user) {
                    navigate("/login");
                    return;
                  }

                  interactWithPost(
                    postDispatch,
                    postAndInteraction.post.id,
                    true,
                    "like"
                  );
                  return;
                }}
              >
                ❤
              </div>

              {/* laugh */}
              <span
                role="button"
                className={`me-2 ${
                  postAndInteraction.interactions?.laughStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (!userState.user) {
                    navigate("/login");
                    return;
                  }

                  interactWithPost(
                    postDispatch,
                    postAndInteraction.post.id,
                    true,
                    "laugh"
                  );
                  return;
                }}
              >
                😄
              </span>

              {/* confused */}
              <span
                role="button"
                className={`${
                  postAndInteraction.interactions?.confusedStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (!userState.user) {
                    navigate("/login");
                    return;
                  }

                  interactWithPost(
                    postDispatch,
                    postAndInteraction.post.id,
                    true,
                    "confused"
                  );
                  return;
                }}
              >
                😕
              </span>
            </span>
          </div>
        </div>
      )}

      {/* show edit/delete button or not */}
      {userState.user?.username === postAndInteraction.post.user.username ? (
        <div className="mt-1 d-flex flex-column">
          {/* edit */}
          <span
            role="button"
            className="text-decoration-none"
            onClick={() => {
              const url = isNotMain
                ? `/post/edit/${postAndInteraction.post.id}`
                : `/post/${postAndInteraction.post.id}`;

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
                deletePost(postDispatch, postAndInteraction.post.id);
                navigate("/");
              } else {
                navigate(`/post/${postAndInteraction.post.id}`);
              }

              return;
            }}
          >
            <i className="bi bi-trash3"></i>
          </span>
        </div>
      ) : null}
    </div>
  );
};
export default EditSection;

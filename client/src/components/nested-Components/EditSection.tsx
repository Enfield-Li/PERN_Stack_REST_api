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

  return (
    <div className="d-flex flex-column">
      <div>
        {/* like */}
        <span className="d-flex">
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

      {/* show edit/delete button or not */}
      {isNotMain &&
      userState.user?.username === postAndInteraction.post.user.username ? (
        <div className="mt-1 d-flex flex-column">
          {/* edit */}
          <span
            role="button"
            className="text-decoration-none"
            onClick={() => {
              navigate(`/post/edit/${postAndInteraction.post.id}`);
            }}
          >
            📝
          </span>

          {/* delete */}
          <span
            role="button"
            className="mt-2 text-decoration-none"
            onClick={() => {
              deletePost(postDispatch, postAndInteraction.post.id);
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

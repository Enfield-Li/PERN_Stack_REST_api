import { useNavigate } from "react-router-dom";
import {
  deletePost,
  interactWithPost,
  usePost,
} from "../../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { useUser } from "../../contexts/User/actions/UserAction";

interface EditSectionProps {
  post: PostAndInteractions;
}

const EditSection: React.FC<EditSectionProps> = ({ post }) => {
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
              post.user.interactions?.likeStatus ? "bg-secondary rounded" : null
            }`}
            onClick={() => {
              if (!userState.user) {
                navigate("/login");
                return;
              }

              interactWithPost(postDispatch, post.id, true, "like");
              return;
            }}
          >
            ❤
          </div>

          {/* laugh */}
          <span
            role="button"
            className={`me-2 ${
              post.user.interactions?.laughStatus
                ? "bg-secondary rounded"
                : null
            }`}
            onClick={() => {
              if (!userState.user) {
                navigate("/login");
                return;
              }

              interactWithPost(postDispatch, post.id, true, "laugh");
              return;
            }}
          >
            😄
          </span>

          {/* confused */}
          <span
            role="button"
            className={`${
              post.user.interactions?.confusedStatus
                ? "bg-secondary rounded"
                : null
            }`}
            onClick={() => {
              if (!userState.user) {
                navigate("/login");
                return;
              }

              interactWithPost(postDispatch, post.id, true, "confused");
              return;
            }}
          >
            😕
          </span>
        </span>
      </div>
      {/* show edit/delete button or not */}
      {userState.user?.username === post.user.username ? (
        <div className="mt-1 d-flex flex-column">
          {/* edit */}
          <span
            role="button"
            className="text-decoration-none"
            onClick={() => {}}
          >
            📝
          </span>

          {/* delete */}
          <span
            role="button"
            className="mt-2 text-decoration-none"
            onClick={() => {
              deletePost(postDispatch, post.id);
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

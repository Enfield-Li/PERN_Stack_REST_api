import { useNavigate } from "react-router-dom";
import {
  interactWithPost,
  usePost,
} from "../../contexts/Post/actions/PostAction";
import { useUser } from "../../contexts/User/actions/UserAction";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";

interface InteractionDisplayProps {
  post: PostAndInteractions;
}

const InteractionDisplay: React.FC<InteractionDisplayProps> = ({ post }) => {
  const userInteractions = post.user.interactions;
  const [_, postDispatch] = usePost();
  const [userState] = useUser();
  const navigate = useNavigate();

  return (
    <div className="d-flex mt-2">
      {/* like */}
      {post.likePoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            userInteractions?.likeStatus ? "border-info" : "border-dark"
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
          onClick={() => {
            if (!userState.user) {
              navigate("/login");
              return;
            }

            interactWithPost(postDispatch, post.id, true, "laugh");
            return;
          }}
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
          onClick={() => {
            if (!userState.user) {
              navigate("/login");
              return;
            }

            interactWithPost(postDispatch, post.id, true, "confused");
            return;
          }}
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

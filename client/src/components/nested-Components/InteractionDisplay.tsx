import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";

interface InteractionDisplayProps {
  post: PostAndInteractions;
}

const InteractionDisplay: React.FC<InteractionDisplayProps> = ({ post }) => {
  const userInteractions = post.user.interactions;
  console.log(userInteractions?.likeStatus);

  return (
    <div className="d-flex">
      {/* like */}
      {post.likePoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            userInteractions?.likeStatus ? "border-info" : "border-dark"
          }`}
          onClick={async () => {
            // if (meData?.me === null) {
            //   // router.replace(`/login?next=${path}`);
            //   router.push("/login");
            //   return;
            // }
            // await interactWithPost(post.id, "like", interact, state);
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
            // if (meData?.me === null) {
            //   // router.replace(`/login?next=${path}`);
            //   router.push("/login");
            //   return;
            // }
            // interactWithPost(post.id, "laugh", interact, state);
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
            // if (meData?.me === null) {
            //   // router.replace(`/login?next=${path}`);
            //   router.push("/login");
            //   return;
            // }
            // interactWithPost(post.id, "confused", interact, state);
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

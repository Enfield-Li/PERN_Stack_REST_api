import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import InteractionDisplay from "./InteractionDisplay";
import { Link } from "react-router-dom";

interface PostCardSectionProps {
  postAndInteractions: PostAndInteractions;
}

const PostCardSection: React.FC<PostCardSectionProps> = ({
  postAndInteractions,
}) => {
  return (
    <div className="my-2">
      <Link
        to={`/post/${postAndInteractions.post.id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        {/* title */}
        <div role="button" className="card-title text-decoration-none h3">
          {postAndInteractions.post.title}
        </div>

        {/* text */}
        <p className="card-text mt-1 text-muted fs-5">
          {postAndInteractions.post.content}
        </p>
      </Link>
      <InteractionDisplay postAndInteractions={postAndInteractions} />
    </div>
  );
};

export default PostCardSection;

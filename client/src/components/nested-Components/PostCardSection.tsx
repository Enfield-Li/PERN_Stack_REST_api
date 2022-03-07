import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import InteractionDisplay from "./InteractionDisplay";
import { Link } from "react-router-dom";

interface PostCardSectionProps {
  post: PostAndInteractions;
}

const PostCardSection: React.FC<PostCardSectionProps> = ({ post }) => {
  return (
    <div className="my-2">
      <Link
        to={`/post/${post.id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        {/* title */}
        <div
          role="button"
          className="card-title text-dark text-decoration-none h3"
        >
          {post.title}
        </div>

        {/* text */}
        <p className="card-text mt-1 fs-5">{post.content}</p>
      </Link>
      <InteractionDisplay post={post} />
    </div>
  );
};

export default PostCardSection;

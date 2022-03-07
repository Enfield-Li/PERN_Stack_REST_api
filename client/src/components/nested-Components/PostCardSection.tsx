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
        <div role="button" className="card-title text-decoration-none h3">
          {post.title}
        </div>

        {/* text */}
        <p className="card-text mt-1 text-muted fs-5">
          {post.content?.slice(0, 50)}
        </p>
      </Link>
      <InteractionDisplay post={post} />
    </div>
  );
};

export default PostCardSection;

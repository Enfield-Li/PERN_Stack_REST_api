import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";

interface PostCardSectionProps {
  post: PostAndInteractions;
}

const PostCardSection: React.FC<PostCardSectionProps> = ({ post }) => {
  return (
    <div className="mt-2">
      {/* title */}
      <div
        role="button"
        className="card-title text-dark text-decoration-none h3"
      >
        {post.title}
      </div>

      {/* text */}
      <p className="card-text mt-1 fs-5">{post.content}</p>
      {/* <InteractionDisplay post={post} /> */}
    </div>
  );
};

export default PostCardSection;

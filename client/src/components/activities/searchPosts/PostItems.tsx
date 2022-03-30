import React from "react";
import { Post } from "../../../contexts/Post/types/PostTypes";

interface PostItemsProps {
  post: Post;
  keyword: string;
}

const PostItems: React.FC<PostItemsProps> = ({ post, keyword }) => {
  return (
    <li>
      <a className="dropdown-item" href="#">
        <span>Title: ({post.title}) </span>
        <span>{post.content}</span>
      </a>
    </li>
  );
};

export default PostItems;

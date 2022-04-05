import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../contexts/Post/types/PostTypes";

interface PostItemsProps {
  post: Post;
  keyword: string;
  setOpen: React.Dispatch<React.SetStateAction<"hide" | "show">>;
}

const PostItems: React.FC<PostItemsProps> = ({ setOpen, post, keyword }) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        setOpen("hide");
        navigate(`/post/${post.id}`);
      }}
    >
      <a className="dropdown-item" href="#">
        <span>Title: ({post.title}) </span>
        <br />
        <span>Content: {post.content}</span>
      </a>
    </li>
  );
};

export default PostItems;

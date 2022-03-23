import axios from "axios";
import { Comments } from "../types/PostTypes";

export const fetchComments = async (postId: string) => {
  const res = await axios.get<Comments>(
    `http://localhost:3119/comments/allCommentsForPost/${postId}`,
    { withCredentials: true }
  );

  return res.data;
};

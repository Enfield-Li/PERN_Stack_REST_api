import { createContext } from "react";
import { PostActionType, PostSorting, PostState } from "./types/PostTypes";

interface PostCtxType {
  state: PostState;
  dispatch: React.Dispatch<PostActionType>;
  sortPost: PostSorting;
  setSortPost: React.Dispatch<React.SetStateAction<PostSorting>>;
}

// const PostContext = createContext({} as PostCtxType);
const PostContext = createContext<PostCtxType | null>(null);

export default PostContext;

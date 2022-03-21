import { createContext } from "react";
import {
  PostActionType,
  postInitialState,
  PostSorting,
  PostState,
} from "./types/PostTypes";

const PostContext = createContext<{
  state: PostState;
  dispatch: React.Dispatch<PostActionType>;
  sortPost: PostSorting;
  setSortPost: React.Dispatch<React.SetStateAction<PostSorting>>;
}>({
  state: postInitialState,
  dispatch: () => {},
  sortPost: "best",
  setSortPost: () => {},
});

export default PostContext;

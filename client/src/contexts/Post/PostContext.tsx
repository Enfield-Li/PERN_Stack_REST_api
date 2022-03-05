import { createContext } from "react";
import { PostActionType, postInitialState, PostState } from "./types/PostTypes";

const PostContext = createContext<{
  state: PostState;
  dispatch: React.Dispatch<PostActionType>;
}>({ state: postInitialState, dispatch: () => {} });

export default PostContext;

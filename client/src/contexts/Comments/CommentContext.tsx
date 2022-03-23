import { createContext } from "react";
import { CommentActionType, commentInitialState, CommentState } from "./types/CommentTypes";

const CommentContext = createContext<{
  state: CommentState;
  dispatch: React.Dispatch<CommentActionType>;
}>({
  state: commentInitialState,
  dispatch: () => {},
});

export default CommentContext;

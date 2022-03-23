import { useReducer } from "react";
import CommentContext from "./CommentContext";
import CommentReducer from "./CommentReducer";
import { commentInitialState } from "./types/CommentTypes";

interface ProviderType {
  children: React.ReactNode;
}

export default function PostProvider({ children }: ProviderType) {
  const [state, dispatch] = useReducer(CommentReducer, commentInitialState);

  return (
    <CommentContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

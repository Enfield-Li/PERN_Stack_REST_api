import { useReducer } from "react";
import CommentContext from "./CommentContext";
import commentReducer from "./CommentReducer";
import { commentInitialState } from "./types/CommentTypes";

interface ProviderType {
  children: React.ReactNode;
}

export default function CommentProvider({ children }: ProviderType) {
  const [state, dispatch] = useReducer(commentReducer, commentInitialState);

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

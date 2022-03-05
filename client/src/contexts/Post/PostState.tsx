import { useReducer } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import { postInitialState } from "./types/PostTypes";

interface ProviderType {
  children: React.ReactNode;
}

export default function PostProvider({ children }: ProviderType) {
  const [state, dispatch] = useReducer(PostReducer, postInitialState);

  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

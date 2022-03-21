import { useReducer, useState } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import { postInitialState, PostSorting } from "./types/PostTypes";

interface ProviderType {
  children: React.ReactNode;
}

export default function PostProvider({ children }: ProviderType) {
  const [state, dispatch] = useReducer(PostReducer, postInitialState);
  const [sortPost, setSortPost] = useState<PostSorting>("best");

  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        sortPost,
        setSortPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

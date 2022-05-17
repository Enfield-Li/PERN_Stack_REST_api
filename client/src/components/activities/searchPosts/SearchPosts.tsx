import React, { useEffect, useState } from "react";
import {
  searchPosts,
  usePost,
} from "../../../contexts/Post/actions/PostAction";
import PostItems from "./PostItems";

interface SearchPostsProps {}

const SearchPosts: React.FC<SearchPostsProps> = ({}) => {
  const { postDispatch, postState } = usePost();
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState<"hide" | "show">("hide");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // searchPosts(keyword, postDispatch);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  useEffect(() => {
    if (postState.postsInSearch.length) {
      setOpen("show");
      return;
    }

    setOpen("hide");
  }, [postState.postsInSearch]);

  return (
    <>
      <div className="dropdown">
        <input
          autoFocus
          type="text"
          autoComplete="off"
          className="form-control"
          placeholder="Search posts..."
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          onBlur={() => {
            // setOpen("hide");
            setKeyword("");
          }}
        />

        <ul
          className={`dropdown-menu ${open}`}
          aria-labelledby="dropdownMenuClickableInside"
          style={{ width: 400, overflow: "scroll" }}
        >
          {postState.postsInSearch.map((post) => (
            <PostItems key={post.id} post={post} keyword={keyword} setOpen={setOpen} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchPosts;

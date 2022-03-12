import React, { useState } from "react";
import {
  fetchPaginatedPosts,
  usePost,
} from "../../contexts/Post/actions/PostAction";

interface FilterByProps {
  state: "new" | "hot" | "best";
  setState: React.Dispatch<React.SetStateAction<"new" | "hot" | "best">>;
}

const FilterBy: React.FC<FilterByProps> = ({ state, setState }) => {
  const [_, postDispatch] = usePost();
  console.log("order State: ", state);

  const fontAndBg = "rounded-pill text-primary";
  const selectedBg = { background: "#f6f7f8" };

  return (
    <div className="card d-flex flex-row justify-content-around p-2 align-items-center">
      {/* best */}
      <div
        className={`p-2 fs-4 ${
          state === "best" ? fontAndBg : "text-secondary"
        }`}
        role="button"
        style={state === "best" ? selectedBg : undefined}
        onClick={() => {
          setState("best");
          fetchPaginatedPosts(postDispatch, "best");
        }}
      >
        <i className="bi bi-capslock-fill"></i>
        <span className="ms-1">Best</span>
      </div>

      {/* hot */}
      <div
        className={`p-2  fs-4 ${
          state === "hot" ? fontAndBg : "text-secondary"
        }`}
        style={state === "hot" ? selectedBg : undefined}
        role="button"
        onClick={() => {
          setState("hot");
          fetchPaginatedPosts(postDispatch, "hot");
        }}
      >
        <i className="bi bi-cursor-fill"></i>
        <span className="ms-1">Hot</span>
      </div>

      {/* new */}
      <div
        className={`p-2  fs-4 ${
          state === "new" ? fontAndBg : "text-secondary"
        }`}
        style={state === "new" ? selectedBg : undefined}
        role="button"
        onClick={() => {
          setState("new");
          fetchPaginatedPosts(postDispatch, "new");
        }}
      >
        <i className="bi bi-gear-wide"></i>
        <span className="ms-1">New</span>
      </div>
    </div>
  );
};

export default FilterBy;

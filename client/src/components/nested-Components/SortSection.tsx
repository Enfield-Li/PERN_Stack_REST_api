import React, { useState } from "react";
import {
  fetchPaginatedPosts,
  usePost,
} from "../../contexts/Post/actions/PostAction";

interface SortByProps {
  sortState: "new" | "hot" | "best" | "top";
  setSortState: React.Dispatch<
    React.SetStateAction<"new" | "hot" | "best" | "top">
  >;
  topYear: "half-year" | "one-year" | "all-time";
  setTopYear: React.Dispatch<
    React.SetStateAction<"half-year" | "one-year" | "all-time">
  >;
}

const SortSection: React.FC<SortByProps> = ({
  sortState,
  setSortState,
  topYear,
  setTopYear,
}) => {
  const [_, postDispatch] = usePost();

  const fontAndBg = "rounded-pill text-primary";
  const selectedBg = { background: "#f6f7f8" };

  const fetchSortedPost = (
    categ: "new" | "hot" | "best" | "top",
    time?: "half-year" | "one-year" | "all-time"
  ) => {
    setSortState(categ);

    if (categ === "top" && time) {
      setTopYear(time);
      fetchPaginatedPosts(postDispatch, categ, undefined, time);
      return;
    }

    fetchPaginatedPosts(postDispatch, categ);
  };

  return (
    <div className="card d-flex flex-row justify-content-around p-2 align-items-center">
      {/* best */}
      <div
        className={`p-2 fs-4 ${
          sortState === "best" ? fontAndBg : "text-secondary"
        }`}
        role="button"
        style={sortState === "best" ? selectedBg : undefined}
        onClick={() => fetchSortedPost("best")}
      >
        <i className="bi bi-capslock-fill"></i>
        <span className="ms-1">Best</span>
      </div>

      {/* hot */}
      <div
        className={`p-2  fs-4 ${
          sortState === "hot" ? fontAndBg : "text-secondary"
        }`}
        style={sortState === "hot" ? selectedBg : undefined}
        role="button"
        onClick={() => fetchSortedPost("hot")}
      >
        <i className="bi bi-cursor-fill"></i>
        <span className="ms-1">Hot</span>
      </div>

      {/* new */}
      <div
        className={`p-2  fs-4 ${
          sortState === "new" ? fontAndBg : "text-secondary"
        }`}
        style={sortState === "new" ? selectedBg : undefined}
        role="button"
        onClick={() => fetchSortedPost("new")}
      >
        <i className="bi bi-gear-wide"></i>
        <span className="ms-1">New</span>
      </div>

      {/* top */}
      <div
        className={`p-2  fs-4 ${
          sortState === "top" ? fontAndBg : "text-secondary"
        }`}
        style={sortState === "top" ? selectedBg : undefined}
        role="button"
      >
        <span
          onClick={() => fetchSortedPost("top", "half-year")}
          className="mx-1"
        >
          <i className="bi bi-eject-fill"></i>
          <span>Top</span>
        </span>

        {/* dropdown */}
        {sortState === "top" ? (
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-info dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {topYear}
            </button>
            <ul className="dropdown-menu">
              <li onClick={() => fetchSortedPost("top", "half-year")}>
                <a className="dropdown-item" href="#">
                  Half year
                </a>
              </li>
              <li onClick={() => fetchSortedPost("top", "one-year")}>
                <a className="dropdown-item" href="#">
                  One year
                </a>
              </li>
              <li onClick={() => fetchSortedPost("top", "all-time")}>
                <a className="dropdown-item" href="#">
                  All time
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SortSection;

import React, { useState } from "react";
import {
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";
import {
  PostSorting,
  SortPostWithTop,
} from "../contexts/Post/types/PostTypes";

interface SortByProps {
  topYear: SortPostWithTop;
  setTopYear: React.Dispatch<React.SetStateAction<SortPostWithTop>>;
}

const SortSection: React.FC<SortByProps> = ({ topYear, setTopYear }) => {
  const { postDispatch, sortPost, setSortPost } = usePost();

  const fontAndBg = "rounded-pill text-primary";
  const selectedBg = { background: "#f6f7f8" };

  const fetchSortedPost = (categ: PostSorting, time?: SortPostWithTop) => {
    setSortPost(categ);

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
          sortPost === "best" ? fontAndBg : "text-secondary"
        }`}
        role="button"
        style={sortPost === "best" ? selectedBg : undefined}
        onClick={() => fetchSortedPost("best")}
      >
        <i className="bi bi-capslock-fill"></i>
        <span className="ms-1">Best</span>
      </div>

      {/* hot */}
      <div
        className={`p-2  fs-4 ${
          sortPost === "hot" ? fontAndBg : "text-secondary"
        }`}
        style={sortPost === "hot" ? selectedBg : undefined}
        role="button"
        onClick={() => fetchSortedPost("hot")}
      >
        <i className="bi bi-cursor-fill"></i>
        <span className="ms-1">Hot</span>
      </div>

      {/* new */}
      <div
        className={`p-2  fs-4 ${
          sortPost === "new" ? fontAndBg : "text-secondary"
        }`}
        style={sortPost === "new" ? selectedBg : undefined}
        role="button"
        onClick={() => fetchSortedPost("new")}
      >
        <i className="bi bi-gear-wide"></i>
        <span className="ms-1">New</span>
      </div>

      {/* top */}
      <div
        className={`p-2  fs-4 ${
          sortPost === "top" ? fontAndBg : "text-secondary"
        }`}
        style={sortPost === "top" ? selectedBg : undefined}
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
        {sortPost === "top" ? (
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

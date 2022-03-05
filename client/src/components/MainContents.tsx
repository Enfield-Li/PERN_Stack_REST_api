import React from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/actions/action";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import CreatePostArea from "./layout/CreatePostArea";
import PostCardSection from "./nested-Components/PostCardSection";
import VoteSection from "./nested-Components/voteSection";

interface MainContentsProps {}

const MainContents: React.FC<MainContentsProps> = ({}) => {
  const [state, dispatch] = useGlobal();

  return (
    <div>
      <CreatePostArea />

      {state.posts.length > 0 ? (
        state.posts.map((post) => (
          <div className="card my-3 " key={post.postId}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <VoteSection post={post} />

                  <Link
                    to={`/post/${post.postId}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div
                      className="d-flex flex-column justify-content-between"
                      style={{ color: "gray" }}
                    >
                      <PostCardSection post={post} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <ContentPlaceholder />
          <ContentPlaceholder />
        </div>
      )}
    </div>
  );
};

export default MainContents;

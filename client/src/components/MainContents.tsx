import React from "react";
import { Link } from "react-router-dom";
import {
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import CreatePostArea from "./layout/CreatePostArea";
import PostCardSection from "./nested-Components/PostCardSection";
import PostCreatorInfo from "./nested-Components/PostCreatorInfo";
import VoteSection from "./nested-Components/voteSection";

interface MainContentsProps {}

const MainContents: React.FC<MainContentsProps> = ({}) => {
  const [postState, postDispatch] = usePost();
  const posts = postState.paginatedPosts;

  return (
    <div>
      <CreatePostArea />

      {posts.postAndInteractions.length > 0 ? (
        posts.postAndInteractions.map((post) => (
          <div className="card my-3 " key={post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <VoteSection post={post} />

                  <Link
                    to={`/post/${post.id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <PostCreatorInfo post={post} />
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

      <div className="d-flex justify-content-center">
        {posts.hasMore ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              fetchPaginatedPosts(
                posts.postAndInteractions[posts.postAndInteractions.length - 1]
                  .createdAt,
                postDispatch
              );
            }}
          >
            More Posts
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default MainContents;

import React from "react";
import { Link } from "react-router-dom";
import { usePost } from "../contexts/Post/actions/PostAction";
import { useUser } from "../contexts/User/actions/UserAction";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import CreatePostArea from "./layout/CreatePostArea";
import PostCardSection from "./nested-Components/PostCardSection";
import VoteSection from "./nested-Components/voteSection";

interface MainContentsProps {}

const MainContents: React.FC<MainContentsProps> = ({}) => {
  const [state, dispatch] = usePost();
  console.log("post: ", state.paginatedPosts);

  return (
    <div>
      <CreatePostArea />

      {state.paginatedPosts.posts.length > 0 ? (
        state.paginatedPosts.posts.map((post) => (
          <div className="card my-3 " key={post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <VoteSection post={post} />

                  <Link
                    to={`/post/${post.id}`}
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

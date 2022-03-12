import React, { useState } from "react";
import {
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import CreatePostArea from "./layout/CreatePostArea";
import EditSection from "./nested-Components/EditSection";
import PostCardSection from "./nested-Components/PostCardSection";
import PostCreatorInfo from "./nested-Components/PostCreatorInfo";
import VoteSection from "./nested-Components/voteSection";
import FilterBy from "./layout/FilterBy";

interface MainContentsProps {}

const MainContents: React.FC<MainContentsProps> = ({}) => {
  const [{ paginatedPosts }, postDispatch] = usePost();

  const [state, setState] = useState<"new" | "hot" | "best">("best");

  return (
    <div>
      <CreatePostArea />
      <FilterBy state={state} setState={setState} />

      {paginatedPosts.postAndInteractions.length > 0 ? (
        paginatedPosts.postAndInteractions.map((postAndInteraction) => (
          <div className="card my-3 " key={postAndInteraction.post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <VoteSection postAndInteractions={postAndInteraction} />
                  <div>
                    <PostCreatorInfo postAndInteractions={postAndInteraction} />
                    <div
                      className="d-flex flex-column justify-content-between"
                      style={{ color: "gray" }}
                    >
                      <PostCardSection
                        postAndInteractions={postAndInteraction}
                      />
                    </div>
                  </div>
                </div>
                <EditSection
                  postAndInteractions={postAndInteraction}
                  isNotMain={false}
                />
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
        {paginatedPosts.hasMore ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              fetchPaginatedPosts(
                postDispatch,
                state,
                paginatedPosts.postAndInteractions[
                  paginatedPosts.postAndInteractions.length - 1
                ].post.createdAt
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

import React, { useEffect, useState } from "react";
import {
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";
import ContentPlaceholder from "./layout/placeHolders/ContentPlaceholder";
import CreatePostArea from "./layout/CreatePostArea";
import EditSection from "./nested-Components/postSection/EditSection";
import PostCardSection from "./nested-Components/postSection/PostCardSection";
import PostCreatorInfo from "./nested-Components/user/PostCreatorInfo";
import VoteSection from "./nested-Components/postSection/voteSection";
import SortSection from "./layout/SortSection";

interface MainContentsProps {}

const MainContents: React.FC<MainContentsProps> = ({}) => {
  const { postState, postDispatch, setSortPost, sortPost } = usePost();

  const paginatedPosts = postState.paginatedPosts;
  const postAndInteractions = postState.paginatedPosts.postAndInteractions;

  const [topYear, setTopYear] = useState<"half-year" | "one-year" | "all-time">(
    "half-year"
  );

  // off set based pagination
  const [offSetCount, setOffSetCount] = useState(1);

  useEffect(() => {
    setSortPost("best");
  }, []);

  let cursor = new Date(Date.now()).toISOString();
  for (let i = 0; i < postAndInteractions.length; i++) {
    const postDate = new Date(
      postAndInteractions[i].post.createdAt
    ).toISOString();

    if (postDate < cursor) {
      cursor = postDate;
    }
  }

  return (
    <div>
      <CreatePostArea />
      <SortSection topYear={topYear} setTopYear={setTopYear} />

      {postAndInteractions.length > 0 ? (
        postAndInteractions.map((postAndInteraction) => (
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
              if (sortPost === "top") {
                fetchPaginatedPosts(
                  postDispatch,
                  sortPost,
                  offSetCount.toString(),
                  topYear
                );
                setOffSetCount(offSetCount + 1);
                return;
              }
              fetchPaginatedPosts(postDispatch, sortPost, cursor);
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

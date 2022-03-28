import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchPaginatedPosts,
  usePost,
} from "../contexts/Post/actions/PostAction";
import { SortPostWithTop } from "../contexts/Post/types/PostTypes";
import { useGoTop } from "../utils/useGoTop";
import CreatePostArea from "./CreatePostArea";
import ContentPlaceholder from "./placeholders/ContentPlaceholder";
import PostCard from "./post/PostCard";
import SortSection from "./SortSection";

interface MainContentsProps {}

const MainContents: React.FC<MainContentsProps> = ({}) => {
  const { postState, postDispatch, setSortPost, sortPost } = usePost();
  const { isVisible, scrollToTop } = useGoTop();

  const paginatedPosts = postState.paginatedPosts;
  const postAndInteractions = postState.paginatedPosts.postAndInteractions;

  const [topYear, setTopYear] = useState<SortPostWithTop>("half-year");

  // Off set based pagination set up
  const [offSetCount, setOffSetCount] = useState(1);

  // Cursor based pagination set up
  let cursor = new Date(Date.now()).toISOString();
  for (let i = 0; i < postAndInteractions.length; i++) {
    const postDate = new Date(
      postAndInteractions[i].post.createdAt
    ).toISOString();

    if (postDate < cursor) {
      cursor = postDate;
    }
  }

  const fetchMorePosts = () => {
    // If sort by === top, fetch offset based pagination
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

    // else fetch cursor based pagination
    fetchPaginatedPosts(postDispatch, sortPost, cursor);
  };

  return (
    <div>
      <CreatePostArea />
      <SortSection topYear={topYear} setTopYear={setTopYear} />
      {/* Content area */}
      <InfiniteScroll
        dataLength={postAndInteractions.length}
        next={fetchMorePosts}
        hasMore={paginatedPosts.hasMore}
        loader={<ContentPlaceholder />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yo! You have seen it all</b>
          </p>
        }
      >
        {postAndInteractions.length > 0 ? (
          postAndInteractions.map((postAndInteraction) => (
            <PostCard
              postAndInteraction={postAndInteraction}
              key={postAndInteraction.post.id}
            />
          ))
        ) : (
          <div>
            <ContentPlaceholder />
            <ContentPlaceholder />
          </div>
        )}
      </InfiniteScroll>

      {/* Back to top */}
      <div className="scroll-to-top">
        {isVisible && (
          <div onClick={scrollToTop}>
            <div className="btn btn-primary">Back to top</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContents;

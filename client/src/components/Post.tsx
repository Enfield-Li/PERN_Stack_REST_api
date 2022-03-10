import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost, usePost } from "../contexts/Post/actions/PostAction";
import { PostAndInteractions } from "../contexts/Post/types/PostTypes";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import EditSection from "./nested-Components/EditSection";
import InteractionDisplay from "./nested-Components/InteractionDisplay";
import PostCreatorInfo from "./nested-Components/PostCreatorInfo";
import VoteSection from "./nested-Components/voteSection";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const [{ currentPost }, postDispatch] = usePost();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchSinglePost(postDispatch, +id);
  }, []);

  if (currentPost) {
    return (
      <div>
        <div className="card my-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <VoteSection postAndInteractions={currentPost} />
                <div>
                  <PostCreatorInfo postAndInteractions={currentPost} />
                  <h3 className="my-2">{currentPost.post.title}</h3>
                  <p className="card-text mb-3 me-2 fs-5">
                    {currentPost.post.content}
                  </p>
                  <InteractionDisplay postAndInteractions={currentPost} />
                </div>
              </div>
              <EditSection postAndInteractions={currentPost} isNotMain={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ContentPlaceholder />;
};

export default Post;

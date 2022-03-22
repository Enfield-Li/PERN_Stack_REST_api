import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCreatorInfo from "../user-related/PostCreatorInfo";
import VoteSection from "./sections/voteSection";
import {
  usePost,
  fetchSinglePost,
} from "../../contexts/Post/actions/PostAction";
import ContentPlaceholder from "../placeholders/ContentPlaceholder";
import EditSection from "./sections/EditSection";
import InteractionDisplay from "./sections/InteractionDisplay";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = ({}) => {
  const { postState, postDispatch } = usePost();
  const { currentPost } = postState;

  const { id } = useParams();

  useEffect(() => {
    if (id) fetchSinglePost(postDispatch, +id);
  }, []);

  return (
    <>
      {currentPost ? (
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
                <EditSection
                  postAndInteractions={currentPost}
                  isNotMain={true}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContentPlaceholder />
      )}
    </>
  );
};

export default PostPage;

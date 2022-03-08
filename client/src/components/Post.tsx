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
  const [{ paginatedPosts }] = usePost();
  const { id } = useParams();

  const existingPostId: number[] = [];
  paginatedPosts.postAndInteractions.forEach((postAndInteraction) => {
    existingPostId.push(postAndInteraction.post.id);
  });

  let postData: PostAndInteractions | null = null;

  if (id) {
    if (!existingPostId.includes(+id)) {
      return <div>Post does not exist...</div>;
    }

    postData = paginatedPosts.postAndInteractions.filter((postAndInteraction) => {
      return postAndInteraction.post.id === +id;
    })[0];

    return (
      <div>
        <div className="card my-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <VoteSection postAndInteractions={postData} />
                <div>
                  <PostCreatorInfo postAndInteractions={postData} />
                  <h3 className="my-2">{postData.post.title}</h3>
                  <p className="card-text mb-3 me-2 fs-5">
                    {postData.post.content}
                  </p>
                  <InteractionDisplay postAndInteractions={postData} />
                </div>
              </div>
              <EditSection postAndInteraction={postData} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ContentPlaceholder />;
};

export default Post;

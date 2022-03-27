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
import {
  fetchComments,
  useComment,
} from "../../contexts/Comments/actions/commentAction";
import CreateComment from "../comments/create-edit/CreateComment";
import PostComments from "../comments/PostComments";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = ({}) => {
  const { postState, postDispatch } = usePost();
  const { commentState, commentDispatch } = useComment();
  const { id } = useParams();
  const { currentPost } = postState;

  useEffect(() => {
    if (id) {
      fetchSinglePost(postDispatch, id);

      fetchComments(+id, commentDispatch);
    }
  }, []);

  return (
    <>
      {currentPost ? (
        <div>
          <div className="card my-2">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex w-100">
                  <VoteSection postAndInteractions={currentPost} />

                  <div className="w-100">
                    <PostCreatorInfo postAndInteractions={currentPost} />
                    <h3 className="my-2">{currentPost.post.title}</h3>
                    <p className="card-text mb-3 me-2 fs-5">
                      {currentPost.post.content}
                    </p>
                    <InteractionDisplay postAndInteractions={currentPost} />

                    <CreateComment
                      postId={currentPost.post.id}
                      isReply={false}
                      isComment={false}
                    />
                    <PostComments postId={currentPost.post.id} />
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

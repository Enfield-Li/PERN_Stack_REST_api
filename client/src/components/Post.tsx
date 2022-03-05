import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost, useGlobal } from "../contexts/User/actions/UserAction";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import VoteSection from "./nested-Components/voteSection";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const [{ currentPost: postData }, dispatch] = useGlobal();
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      if (id) await fetchSinglePost(dispatch, +id);
    };
    fetch();
  }, [id]);

  return (
    <>
      {postData ? (
        <div>
          <div className="card my-2">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <VoteSection post={postData} />
                  <div>
                    {/* <PostCreatorInfo
                      creator={postData.Post.creator}
                      createdAt={postData.Post.createdAt}
                    /> */}
                    <h3 className="my-2">{postData.title}</h3>
                    <p className="card-text mb-3 text-muted me-2 fs-5">
                      {postData.content}
                    </p>
                    {/* <InteractionDisplay post={postData.Post} /> */}
                  </div>
                </div>
                {/* <EditSection post={postData.Post} /> */}
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

export default Post;

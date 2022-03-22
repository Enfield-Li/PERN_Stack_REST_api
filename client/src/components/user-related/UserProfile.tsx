import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCreatorInfo from "./PostCreatorInfo";
import ProfileCard from "./ProfileCard";
import VoteSection from "../post/sections/voteSection";
import {
  useUser,
  getUserProfile,
} from "../../contexts/User/actions/UserAction";
import EditSection from "../post/sections/EditSection";
import PostCardSection from "../post/sections/PostCardSection";

const UserProfile: React.FC = ({}) => {
  const { id } = useParams();
  const { userState, userDispatch } = useUser();
  const { user, userProfile } = userState;

  useEffect(() => {
    if (id) getUserProfile(userDispatch, +id);
  }, [id]);

  const fetchMorePosts = (id: string) => {
    getUserProfile(
      userDispatch,
      +id,
      userProfile?.userPaginatedPost.postAndInteractions[
        userProfile?.userPaginatedPost.postAndInteractions.length - 1
      ].post.createdAt
    );
  };

  return (
    <div className="row">
      <div className="col-9">
        {userProfile?.userPaginatedPost.postAndInteractions.map(
          (postAndInteraction) => (
            <div className="card my-3 " key={postAndInteraction.post.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  {/* left */}
                  <div className="d-flex justify-content-between">
                    <VoteSection
                      postAndInteractions={postAndInteraction}
                      isInProfile={true}
                    />

                    <div>
                      <PostCreatorInfo
                        postAndInteractions={postAndInteraction}
                      />
                      <div
                        className="d-flex flex-column justify-content-between"
                        style={{ color: "gray" }}
                      >
                        <PostCardSection
                          postAndInteractions={postAndInteraction}
                          isInProfile={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* right */}
                  <EditSection
                    postAndInteractions={postAndInteraction}
                    isNotMain={true}
                    isInProfile={true}
                  />
                </div>
              </div>
            </div>
          )
        )}

        {/* Fetch More */}
        <div className="d-flex justify-content-center my-2">
          {userProfile?.userPaginatedPost.hasMore && id ? (
            <button
              className="btn btn-primary"
              onClick={() => fetchMorePosts(id)}
            >
              More Posts
            </button>
          ) : null}
        </div>
      </div>
      <div className="col-3 mt-2">
        <ProfileCard
          user={userProfile?.user}
          isMe={user?.id === userProfile?.user.id}
        />
      </div>
    </div>
  );
};

export default UserProfile;

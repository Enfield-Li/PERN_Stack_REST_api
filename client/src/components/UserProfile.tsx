import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, useUser } from "../contexts/User/actions/UserAction";
import EditSection from "./nested-Components/postSection/EditSection";
import PostCardSection from "./nested-Components/postSection/PostCardSection";
import PostCreatorInfo from "./nested-Components/user/PostCreatorInfo";
import ProfileCard from "./nested-Components/user/ProfileCard";
import VoteSection from "./nested-Components/postSection/voteSection";

const UserProfile: React.FC = ({}) => {
  const { id } = useParams();
  const { userState, userDispatch } = useUser();
  const { user, userProfile } = userState;

  useEffect(() => {
    if (id) getUserProfile(userDispatch, +id);
  }, [id]);

  return (
    <div className="row">
      <div className="col-9">
        {userProfile?.userPaginatedPost.postAndInteractions.map(
          (postAndInteraction) => (
            <div className="card my-3 " key={postAndInteraction.post.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
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

        <div className="d-flex justify-content-center my-2">
          {userProfile?.userPaginatedPost.hasMore && id ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                getUserProfile(
                  userDispatch,
                  +id,
                  userProfile?.userPaginatedPost.postAndInteractions[
                    userProfile?.userPaginatedPost.postAndInteractions.length -
                      1
                  ].post.createdAt
                );
              }}
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

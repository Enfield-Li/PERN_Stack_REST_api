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
import ContentPlaceholder from "../placeholders/ContentPlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";

const UserProfile: React.FC = ({}) => {
  const { id } = useParams();
  const { userState, userDispatch } = useUser();
  const { user, userProfile } = userState;
  const postAndInteractions =
    userProfile?.userPaginatedPost.postAndInteractions;

  useEffect(() => {
    if (id) getUserProfile(userDispatch, +id);
  }, [id]);

  // Check if user exist
  if (id && userProfile?.userPaginatedPost) {
    const fetchMorePosts = () => {
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
          <InfiniteScroll
            dataLength={
              userProfile?.userPaginatedPost.postAndInteractions.length
            }
            next={fetchMorePosts}
            hasMore={userProfile?.userPaginatedPost.hasMore}
            loader={<ContentPlaceholder />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
          </InfiniteScroll>
          ;
        </div>

        {/* User profile */}
        <div className="col-3 mt-2">
          <ProfileCard
            user={userProfile?.user}
            isMe={user?.id === userProfile?.user.id}
          />
        </div>
      </div>
    );
  }

  return <div>User does not exist!</div>;
};

export default UserProfile;

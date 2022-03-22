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
import { useGoTop } from "../../utils/useGoTop";

const UserProfile: React.FC = ({}) => {
  const { id } = useParams();
  const { isVisible, scrollToTop } = useGoTop();
  const { userState, userDispatch } = useUser();
  const { user, userProfile } = userState;

  useEffect(() => {
    if (id) getUserProfile(userDispatch, +id);
  }, [id]);

  // Check if user exist
  if (id && userProfile?.userPaginatedPost) {
    const postAndInteractions =
      userProfile?.userPaginatedPost.postAndInteractions;

    const fetchMorePosts = () => {
      getUserProfile(
        userDispatch,
        +id,
        postAndInteractions[postAndInteractions.length - 1].post.createdAt
      );
    };

    return (
      <>
        <div className="row">
          <div className="col-9">
            <InfiniteScroll
              dataLength={postAndInteractions.length}
              next={fetchMorePosts}
              hasMore={userProfile?.userPaginatedPost.hasMore}
              loader={<ContentPlaceholder />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {postAndInteractions.map((postAndInteractions) => (
                <div className="card my-3 " key={postAndInteractions.post.id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      {/* left */}
                      <div className="d-flex justify-content-between">
                        <VoteSection
                          postAndInteractions={postAndInteractions}
                          isInProfile={true}
                        />

                        <div>
                          <PostCreatorInfo
                            postAndInteractions={postAndInteractions}
                          />
                          <div
                            className="d-flex flex-column justify-content-between"
                            style={{ color: "gray" }}
                          >
                            <PostCardSection
                              postAndInteractions={postAndInteractions}
                              isInProfile={true}
                            />
                          </div>
                        </div>
                      </div>

                      {/* right */}
                      <EditSection
                        postAndInteractions={postAndInteractions}
                        isNotMain={true}
                        isInProfile={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
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

        {/* Back to top */}
        <div className="scroll-to-top">
          {isVisible && (
            <div onClick={scrollToTop}>
              <div className="btn btn-primary">Back to top</div>
            </div>
          )}
        </div>
      </>
    );
  }

  return <div>User does not exist!</div>;
};

export default UserProfile;

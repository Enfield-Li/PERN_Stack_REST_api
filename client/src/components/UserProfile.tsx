import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, useUser } from "../contexts/User/actions/UserAction";
import { UserProfileRO } from "../contexts/User/types/UserTypes";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import EditSection from "./nested-Components/EditSection";
import PostCardSection from "./nested-Components/PostCardSection";
import PostCreatorInfo from "./nested-Components/PostCreatorInfo";
import VoteSection from "./nested-Components/voteSection";

const UserProfile: React.FC = ({}) => {
  const { id } = useParams();
  const [userState, userDispatch] = useUser();
  console.log(id);

  useEffect(() => {
    if (id) getUserProfile(userDispatch, +id);
  }, [id]);

  return (
    <div className="row ms-2">
      <div className="col-8">
        {userState.userProfile?.userPaginatedPost.postAndInteractions.map(
          (postAndInteraction) => (
            <div className="card my-3 " key={postAndInteraction.post.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-between">
                    <VoteSection postAndInteractions={postAndInteraction} />
                    <div>
                      {/* <PostCreatorInfo
                        postAndInteractions={postAndInteraction}
                      /> */}
                      <div
                        className="d-flex flex-column justify-content-between"
                        style={{ color: "gray" }}
                      >
                        <PostCardSection
                          postAndInteractions={postAndInteraction}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <EditSection
                    postAndInteraction={postAndInteraction}
                    isNotMain={false}
                  /> */}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="col-4">{/* <ProfileCard user={meData} /> */}</div>
    </div>
  );
};

export default UserProfile;

import React from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../contexts/User/actions/UserAction";
import { UserProfileRO } from "../contexts/User/types/UserTypes";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import EditSection from "./nested-Components/EditSection";

const UserProfile: React.FC = ({}) => {
  const { id } = useParams();

  // if (id) getUserProfile(+id);

  return (
    <div className="row ms-2">
      <div className="col-8">
        {/* {!meData?.user?.userPost ? ( */}
        <div>
          <ContentPlaceholder />
          <ContentPlaceholder />
        </div>
        {/* ) :   ( */}
        {/* meData?.user?.userPost.posts.map((post) => (
              <div className="card my-2" key={post.id}> */}
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              {/* <VoteSection post={post} /> */}

              <div className="align-items-center mt-2">
                {/* <PostCardSection
                          // @ts-ignore
                          interact={interact}
                          meData={meData}
                          post={post}
                        /> */}
              </div>
            </div>

            {/* <EditSection post={post} /> */}
          </div>
        </div>
        {/* </div> */}
        {/* )) */}
        {/* )} */}
      </div>
      <div className="col-4">{/* <ProfileCard user={meData} /> */}</div>
    </div>
  );
};

export default UserProfile;

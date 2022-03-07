import { useState } from "react";
import { PostAndInteractions } from "../../contexts/Post/types/PostTypes";
import { calculateTime } from "../../utils/calculaTime";

interface PostCreatorInfoProps {
  post: PostAndInteractions;
}

const PostCreatorInfo: React.FC<PostCreatorInfoProps> = ({ post }) => {
  const [decoration, setDecoration] = useState(false);
  // const {
  //   getArrowProps,
  //   getTooltipProps,
  //   setTooltipRef,
  //   setTriggerRef,
  //   visible,
  // } = usePopperTooltip({
  //   trigger: "hover",
  //   delayHide: 100,
  //   interactive: true,
  //   placement: "right",
  //   // delayShow: 50,
  // });

  return (
    <div className="fs-6 fw-lighter mt-2">
      Posted by{" "}
      <span
        onMouseOver={async () => {
          // setDecoration(true);
          // let data = await apolloClient.query({
          //   query: UserCardDocument,
          //   variables: { userId: creator.id },
          // });
          // setUserCard(data);
        }}
        onMouseLeave={() => setDecoration(false)}
      >
        {/* <span role="button" ref={setTriggerRef}> */}
        <span
          role="button"
          className={`fw-light text-dark ${
            decoration ? "text-decoration-underline" : "text-decoration-none"
          }`}
        >
          {post.user.username}
          {/* </span> */}
        </span>
        {/* {visible && (
          <div ref={setTooltipRef} {...getTooltipProps({ className: "" })}>
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
            <div>
              {userCard?.data
                ? ""
                : // <ProfileCard user={userCard?.data} userCard={true} />
                  null}
            </div>
          </div>
        )} */}
      </span>
      <span className="ms-2 fw-lighter">{calculateTime(post.createdAt)}</span>
    </div>
  );
};
export default PostCreatorInfo;
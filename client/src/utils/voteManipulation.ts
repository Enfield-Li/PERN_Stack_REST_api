import { WritableDraft } from "immer/dist/internal";
import { PostAndInteractions } from "../contexts/Post/types/PostTypes";
import { UserPostAndInteractions } from "../contexts/User/types/UserTypes";

// Pass by value
export const voteManipulation = (
  voteValue: boolean,
  voteStatus: boolean | null,
  votePoints: number
) => {
  if (voteStatus !== voteValue && voteStatus === null) {
    voteStatus = voteValue;
    votePoints = votePoints + (voteValue ? 1 : -1);
  } else if (voteStatus === voteValue && voteStatus !== null) {
    voteStatus = null;
    votePoints = votePoints + (voteValue ? -1 : 1);
  } else {
    voteStatus = voteValue;
    votePoints = votePoints + (voteValue ? 2 : -2);
  }

  return { newVoteStatus: voteStatus, newVotePoints: votePoints };
};

// Pass by reference
export const processVoteStatusAndPoints = (
  postAndInteractions: WritableDraft<
    PostAndInteractions | UserPostAndInteractions
  >,
  voteValue: boolean
) => {
  if (postAndInteractions.interactions) {
    const { newVoteStatus, newVotePoints } = voteManipulation(
      voteValue,
      postAndInteractions.interactions.voteStatus,
      postAndInteractions.post.votePoints
    );

    postAndInteractions.interactions.voteStatus = newVoteStatus;
    postAndInteractions.post.votePoints = newVotePoints;
  }
};

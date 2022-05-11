import {
  Interactions,
  PostAndInteractions,
} from "../contexts/Post/types/PostTypes";
import { UserPostAndInteractions } from "../contexts/User/types/UserTypes";

export const populateWithMockData = (
  interactions: Interactions | null
) => {
  interactions = {
    confusedStatus: null,
    laughStatus: null,
    likeStatus: null,
    voteStatus: null,
  };

  return interactions;
};

export const interactionNullCheckAndPopulateData = (
  postAndInteractions: PostAndInteractions[] | UserPostAndInteractions[]
) => {
  postAndInteractions.forEach((postAndInteraction) => {
    if (!postAndInteraction.interactions) {
      const interactions = postAndInteraction.interactions;

      const newInteractions = populateWithMockData(interactions);

      postAndInteraction.interactions = newInteractions;
    }

    return;
  });
};

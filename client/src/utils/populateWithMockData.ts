import {
  Interactions,
  PostAndInteractions,
} from "../contexts/Post/types/PostTypes";

export const populateWithMockData = (
  interactions: Interactions,
  userId: number,
  postId: number
) => {
  interactions = {
    confusedStatus: null,
    createdAt: new Date(),
    laughStatus: null,
    likeStatus: null,
    postId,
    userId,
    voteStatus: null,
  };

  return interactions;
};

export const interactionNullCheckAndPopulateData = (
  postAndInteractions: PostAndInteractions[]
) => {
  postAndInteractions.forEach((postAndInteraction) => {
    if (postAndInteraction.interactions === null) {
      const interactions = postAndInteraction.interactions;
      const userId = postAndInteraction.post.user.id;
      const postId = postAndInteraction.post.id;

      const newInteractions = populateWithMockData(
        interactions,
        userId,
        postId
      );

      postAndInteraction.interactions = newInteractions;
    }

    return;
  });
};

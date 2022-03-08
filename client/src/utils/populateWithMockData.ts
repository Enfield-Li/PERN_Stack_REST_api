import { PaginatedPost } from "../contexts/Post/types/PostTypes";

export const populateWithMockData = (paginatedPost: PaginatedPost) => {
  paginatedPost.postAndInteractions.forEach((postAndInteraction) => {
    if (postAndInteraction.interactions === null) {
      postAndInteraction.interactions = {
        confusedStatus: null,
        createdAt: new Date(),
        laughStatus: null,
        likeStatus: null,
        postId: postAndInteraction.post.id,
        userId: postAndInteraction.post.user.id,
        voteStatus: null,
      };
    }
    return;
  });
};

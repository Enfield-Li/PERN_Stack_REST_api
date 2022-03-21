import {
  Interactives,
  PostsForChecked,
} from "../contexts/SocketIo/types/socketTypes";

export const collectPostToBeChecked = (interactives: Interactives) => {
  const filtered = interactives.filter((interactive) => {
    if (!interactive.checked) return interactive;
  });

  const postsRes: PostsForChecked = [];
  for (let i = 0; i < filtered.length; i++) {
    const post = filtered[i];
    postsRes.push({ userId: post.userId, postId: post.postId });
  }

  return postsRes;
};

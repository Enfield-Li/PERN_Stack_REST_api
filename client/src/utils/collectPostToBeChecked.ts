import {
  Interactives,
  PostsForChecked,
} from "../contexts/SocketIo/types/socketTypes";

export const collectPostToBeCheckedOrRead = (
  interactives: Interactives,
  isForCheck: boolean
) => {
  const filtered = interactives.filter((interactive) => {
    const filterCondition = isForCheck ? interactive.checked : interactive.read;
    if (!filterCondition) return interactive;
  });

  const postsRes: PostsForChecked[] = [];
  for (let i = 0; i < filtered.length; i++) {
    const post = filtered[i];
    postsRes.push({ userId: post.userId, postId: post.postId });
  }

  return postsRes;
};

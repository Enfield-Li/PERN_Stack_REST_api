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

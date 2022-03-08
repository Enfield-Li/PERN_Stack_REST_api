export const interactionManipulation = (
  interactionStatus: boolean | null,
  interactionPoints: number
) => {
  if (interactionStatus === null) {
    interactionStatus = !interactionStatus;
    interactionPoints = interactionPoints + 1;
  } else if (interactionStatus !== null) {
    interactionStatus = null;
    interactionPoints = interactionPoints - 1;
  }

  return { newStatus: interactionStatus, newPoints: interactionPoints };
};

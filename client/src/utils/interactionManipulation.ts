import { WritableDraft } from "immer/dist/internal";
import {
  PostAndInteractions,
  PostState,
} from "../contexts/Post/types/PostTypes";
import { UserPostAndInteractions } from "../contexts/User/types/UserTypes";

// Pass by value
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

// https://stackoverflow.com/questions/71872370/how-to-update-object-data-based-on-string-input-in-typescript
const pointsTable = {
  like: "likePoints",
  laugh: "laughPoints",
  confused: "confusedPoints",
} as const;

const statusTable = {
  like: "likeStatus",
  laugh: "laughStatus",
  confused: "confusedStatus",
} as const;

type Field = keyof typeof pointsTable;

// Pass by reference
export function prcessPostStatusAndPoints(
  PostAndInteractions: WritableDraft<
    PostAndInteractions | UserPostAndInteractions
  >,
  field: Field
) {
  if (PostAndInteractions.interactions) {
    const { newStatus, newPoints } = interactionManipulation(
      // Original status -> ie. postAndInteraction.interactions.likeStatus
      PostAndInteractions.interactions[statusTable[field]],
      // Original points -> ie. postAndInteraction.post.likePoints
      PostAndInteractions.post[pointsTable[field]]
    );

    // Update status
    PostAndInteractions.interactions[statusTable[field]] = newStatus;
    // Update points
    PostAndInteractions.post[pointsTable[field]] = newPoints;
  }
}

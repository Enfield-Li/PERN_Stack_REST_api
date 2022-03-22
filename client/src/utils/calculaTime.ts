function timeDifference(
  current: number,
  previous: number,
  isSuccinct?: boolean
) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return isSuccinct ? "now" : "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return isSuccinct ? "now" : "less than 1 min ago";
  } else if (elapsed < milliSecondsPerHour) {
    return (
      Math.round(elapsed / milliSecondsPerMinute) +
      (isSuccinct ? "m" : " min. ago")
    );
  } else if (elapsed < milliSecondsPerDay) {
    return (
      Math.round(elapsed / milliSecondsPerHour) +
      (isSuccinct ? "h" : " hr. ago")
    );
  } else if (elapsed < milliSecondsPerMonth) {
    return (
      Math.round(elapsed / milliSecondsPerDay) +
      (isSuccinct ? "d" : " days ago")
    );
  } else if (elapsed < milliSecondsPerYear) {
    return (
      Math.round(elapsed / milliSecondsPerMonth) +
      (isSuccinct ? "m" : " months ago")
    );
  } else {
    return (
      Math.round(elapsed / milliSecondsPerYear) +
      (isSuccinct ? "yr" : " years. ago")
    );
  }
}

export function calculateTime(date: Date, isSuccinct?: boolean) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated, isSuccinct);
}

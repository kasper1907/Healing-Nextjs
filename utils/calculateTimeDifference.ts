import moment from "moment";

export const calculateTimeDifference = (createdAt: string) => {
  const commentTime = moment.utc(createdAt);
  return commentTime.fromNow();
};

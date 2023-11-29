import moment from "moment";

export const calculateTimeDifference = (createdAt: string) => {
  const commentTime = moment(createdAt);
  return commentTime.fromNow();
};

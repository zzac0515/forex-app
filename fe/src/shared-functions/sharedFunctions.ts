import moment, { Moment } from "moment";

export const formatDate = (
  date: Date | string | number | Moment | null
): string => {
  if (!date) return "";
  return moment(date).format("YYYY-MM-DD");
};

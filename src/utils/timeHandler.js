import moment from "moment";

export const parseTime = (timeString) => {
  const formattedTime = moment(timeString, "HH:mm:ss").format("hh:mm:ss");
  console.log(formattedTime);
  return formattedTime;
};

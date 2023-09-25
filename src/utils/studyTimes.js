import axios from "../api/core";
export const getMonthlyStudyTime = async (month) => {
  const res = await axios.get(`/auth/get-study-month-each?month=${month}`);
  return res.data.data;
};

export const getDailyStudyTime = async (day) => {
  const res = await axios.get(`/auth/get-study-day?day=${day}`);
  console.log(res.data.data);
};

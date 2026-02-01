import api, { endpoints } from "../../configs/apis";

export const submitQuiz = async (payload) => {
  try {
    const res = await api.post(endpoints["submitQuiz"], payload);
    return res.data;
  } catch (err) {
    console.error("Submit quiz error:", err);
    throw err;
  }
};

import api, { endpoints } from "@/configs/apis";

export const submitQuiz = async (payload) => {
    try {
        const res = await api.post(endpoints.submitQuiz, payload);
        return {
            success: true,
            data: res.data
        };
    } catch (ex) {
        if (!ex.response) {
            return {
                success: false,
                ex: "Không thể kết nối server"
            };
        }
        return {
            success: false,
            ex: ex.response.data?.message || "Nộp bài thất bại"
        };
    }
};

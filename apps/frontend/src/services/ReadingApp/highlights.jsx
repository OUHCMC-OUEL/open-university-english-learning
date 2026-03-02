import api, { endpoints } from "@/configs/apis";

export const highlights = async (passageContent, questionText) => {
    const res = await api.post(endpoints["highlights"], {
        passage: passageContent,
        question: questionText,
    });
    return res.data;
};

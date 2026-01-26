import api, { endpoints } from "../utils/api";

export const Highlights = async (passageContent, questionText) => {
    const contentToSlice = passageContent.replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
    const res = await api.post(endpoints["getHighlights"], {
        passage: contentToSlice,
        question: questionText,
    });

    return res.data;
};

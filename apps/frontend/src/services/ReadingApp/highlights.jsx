import api, { endpoints } from "@/configs/apis";
import React from "react";

export const highlights = async (passageContent, questionText) => {
    const contentToSlice = passageContent.replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
    const res = await api.post(endpoints["getHighlights"], {
        passage: contentToSlice,
        question: questionText,
    });
    return res.data;
};

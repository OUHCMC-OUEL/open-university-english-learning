import api, { endpoints } from "@/configs/apis";

export const getAllParts = async () => {
    const res = await api.get(endpoints["allParts"]);
    return res.data;
};
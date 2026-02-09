import api, { endpoints } from "@/configs/apis";

export const getAllParts = async (type) => {
    const res = await api.get(endpoints["getAllParts"]);
    return res.data;
};
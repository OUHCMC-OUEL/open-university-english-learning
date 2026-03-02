import api, { endpoints } from "@/configs/apis";

export const partByType = async (type) => {
    const res = await api.post(endpoints["partByType"], {
        type_name:type
    });
    return res.data;
};
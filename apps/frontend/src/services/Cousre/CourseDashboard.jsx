import api, { authApi, endpoints } from "@/configs/apis";

export const getSubject = async () => {
    const res = await api.get(endpoints.subject);
    return res.data;
};

export const getCourseEnrolled = async (bool,page) => {
    const res = await authApi.get(endpoints.getCourseEnrolled, {
        params: { 
            is_enrolled: bool,
            page: page 
        }
    });
    return res.data;
};
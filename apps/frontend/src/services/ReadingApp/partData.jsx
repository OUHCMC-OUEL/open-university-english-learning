import api, { endpoints } from "@/configs/apis";

export const partData = async (part,type) => {
    let currentPart = part;
    if (!currentPart || !currentPart.id) {
        const partRes = await api.post(endpoints.partRandom,{
            type:type
        });
        currentPart = partRes.data;
    }

    const questionsRes = await api.get(endpoints.partQuestions(currentPart.id));

    return {
        passage: currentPart,
        questions: questionsRes.data,
    };
};


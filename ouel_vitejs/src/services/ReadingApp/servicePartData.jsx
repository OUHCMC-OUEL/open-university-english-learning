import api, { endpoints } from "../utils/api";

export const partData = async (part,type) => {
    let currentPart = part;
    console.log(part)
    if (!currentPart || !currentPart.id) {
        const partRes = await api.post(endpoints.getPartRandom,{
            type:type
        });
        currentPart = partRes.data;
    }

    const questionsRes = await api.get(
        endpoints.getPartQuestions(currentPart.id)
    );

    return {
        passage: currentPart,
        questions: questionsRes.data,
    };
};


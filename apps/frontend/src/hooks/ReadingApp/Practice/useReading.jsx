import { useEffect, useState } from "react";
import { partData } from "@/services/ReadingApp/partData";

export function useReading(part,type) {
    const [passage, setPassage] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try {
                const { passage, questions } = await partData(part,type);
                setPassage(passage);
                setQuestions(questions);
            } catch (error) {
                console.error("Lỗi khi kết nối database:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return {passage,questions,loading};
}


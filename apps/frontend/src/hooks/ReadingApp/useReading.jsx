import { useEffect, useState } from "react";
import { partData } from "../../services/ReadingApp/servicePartData";

export function useReading(part,type) {
    const [passage, setPassage] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { passage, questions } = await partData(part,type);
                setPassage(passage);
                setQuestions(questions);
                setCurrentQuestion(questions[0]);
            } catch (error) {
                console.error("Lỗi khi fetch Reading:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return {
        passage,
        questions,
        currentQuestion,
        setCurrentQuestion,
        loading,
    };
}

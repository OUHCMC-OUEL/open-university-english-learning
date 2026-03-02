import { useEffect, useState } from "react";
import { highlights } from "@/services/ReadingApp/highlights";

export function usePassage({passage, questions, index}) {
    const [highlightedContent, setHighlightedContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lockAi, setLockAi] = useState({});
    const [question]= useState(questions[index]);
    
    useEffect(() => {
        setHighlightedContent(null);
        setIsLoading(false);
        console.log("question changed:", question);
    },  [question]);

    const aiSuggestion = async () => {
        if (!question || isLoading || lockAi[index]) return;
        try {
            setIsLoading(true);
            const contentToSlice = passage.content.replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
            const highlight = await highlights(contentToSlice, question.question_text);
            const parts = [];
            let lastIndex = 0;
            if (highlight && highlight.answerText) {
                const answerText = highlight.answerText.replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim()
                const start = contentToSlice.indexOf(answerText);
                if (start !== -1) {
                    const end = start + answerText.length;
                    if (lastIndex < start) {
                        parts.push(<span key="text-before">{contentToSlice.slice(lastIndex, start)}</span>);
                    }
                    parts.push(<mark key={`highlight-${start}-${end}`}>{contentToSlice.slice(start, end)}</mark>);
                    lastIndex = end;
                }
            }
            if (lastIndex < contentToSlice.length) {
                parts.push(<span key="text-end">{contentToSlice.slice(lastIndex)}</span>);
            }
            setHighlightedContent(parts);
            setLockAi(prev => ({
                ...prev,
                [index]: true
            }));
        } catch (err) {
            console.error("Lỗi khi lấy gợi ý từ AI:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return { highlightedContent, isLoading, aiSuggestion, lockAi};
}

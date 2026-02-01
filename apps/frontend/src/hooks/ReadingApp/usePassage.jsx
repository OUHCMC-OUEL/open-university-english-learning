import { useEffect, useState } from "react";
import { Highlights as getHighlights } from "../../services/ReadingApp/serviceHighlights";

export function usePassage(passage, question, lockAi,setLockAi,index) {
    const [highlightedContent, setHighlightedContent] = useState(null);
    const [aiSuggested, setAiSuggested] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setHighlightedContent(null);
        setAiSuggested(false);
        setIsLoading(false);
    }, [question]);

    const getAiSuggestion = async () => {
        if (aiSuggested || !question || isLoading || lockAi[index]) return;
        setIsLoading(true);

        try {
            const highlight = await getHighlights(passage.content, question.question_text);
            const contentToSlice = passage.content.replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();

            const parts = [];
            let lastIndex = 0;

            if (highlight && highlight.answerText) {
                const answerText = highlight.answerText;
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
            setAiSuggested(true);
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

    return { highlightedContent, aiSuggested, isLoading, getAiSuggestion };
}

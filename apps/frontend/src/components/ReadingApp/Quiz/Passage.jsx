import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePassage } from "@/hooks/ReadingApp/Quiz/usePassage";
function Passage ({ passage, questions, index }) {
    const { highlightedContent, isLoading, aiSuggestion, lockAi } = usePassage({passage,questions, index});
    return (
        <div className="w-5/6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{passage.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{highlightedContent || passage.content}</p>
                </CardContent>
                <CardFooter>
                    {questions[index] && (
                        <Button type="submit" className="w-full" onClick={aiSuggestion} disabled={isLoading}>
                            {lockAi[index] ? "Đã từng gợi ý" : isLoading ? "Đang gợi ý..." : "Gợi ý AI"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};
export default Passage;

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { useState } from "react";
import { usePassage } from "../../../hooks/ReadingApp/Quiz/usePassage";
const Passage = ({ passage, question, index}) => {
    const [lockAi, setLockAi] = useState({});
    const { highlightedContent, aiSuggested, isLoading, getAiSuggestion } = usePassage(passage, question, lockAi,setLockAi,index);

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
                    {!aiSuggested && question && (
                        <Button type="submit" className="w-full" onClick={getAiSuggestion} disabled={isLoading}>
                            {isLoading ? "Đang gợi ý..." : lockAi[index] ?"Đã từng gợi ý": "Gợi ý AI"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default Passage;

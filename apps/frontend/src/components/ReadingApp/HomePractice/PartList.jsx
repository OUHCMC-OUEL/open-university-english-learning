import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { tagStyle } from "@/configs/tagStyle";
function PartList({ parts,type }) {
    const navigate = useNavigate();
    if (!parts || parts.length === 0) {
        return <p>Không có bài</p>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {parts.map((part) => (
                <Card
                    key={part.id}
                    onClick={
                        part.type_part === "complete_sentence"
                            ? () => navigate("/reading/exercise/sentence", { state: { part,type } })
                            : () => navigate("/reading/exercise", { state: { part ,type} })
                    }
                    className="cursor-pointer"
                >
                    <CardHeader>
                        <h3 className="">{part.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {part.tag?.map((t) => (
                                <Badge
                                    key={t.name}
                                    style={tagStyle(t.name)}
                                >
                                    {t.name}
                                </Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Số câu hỏi: {part.question_count}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
export default PartList;

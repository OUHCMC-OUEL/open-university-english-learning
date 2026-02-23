import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
function PartList({ parts }) {
    const navigate = useNavigate();
    if (!parts || parts.length === 0) {
        return <p>Không có Part nào</p>;
    }

    const getTagStyle = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + hash * 31;
        }
        const hue = Math.abs(hash) % 360;

        return {
            backgroundColor: `hsl(${hue}, 70%, 85%)`,
            color: `hsl(${hue}, 60%, 25%)`
        };
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {parts.map((part) => (
                <Card
                    key={part.id}
                    onClick={
                        part.type_part === "complete_sentence"
                            ? () => navigate("/reading/exercise/sentence", { state: { part } })
                            : () => navigate("/reading/exercise", { state: { part } })
                    }
                    className="cursor-pointer"
                >
                    <CardHeader>
                        <h3 className="">{part.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {part.tag?.map((t) => (
                                <Badge
                                    key={t.name}
                                    // variant="secondary"
                                    // className={getTagColor(t.name)}
                                    style={getTagStyle(t.name)}
                                >
                                    {t.name}
                                </Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Số câu hỏi: {part.question_count}</p>
                    </CardContent>
                    <CardFooter>
                        <p className="">
                        </p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default PartList;

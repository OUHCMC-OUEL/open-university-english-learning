import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function PartList({ parts }) {
    const navigate = useNavigate();
    if (!parts || parts.length === 0) {
        return <p>Không có Part nào</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {parts.map((part) => (
                <Card
                    key={part.id}
                    onClick={
                        part.type_part === "reading_comprehension"
                            ? () => navigate("/reading", { state: { part } })
                            : undefined
                    }
                    className="cursor-pointer"
                >
                    <CardHeader>
                        <h3 className="">{part.name}</h3>
                        {part.tag?.map((t) => (
                            <Badge variant="secondary" className="mt-1" key={t.name}>{t.name}</Badge>
                        ))}
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

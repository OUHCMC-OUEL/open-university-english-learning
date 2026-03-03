import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table.jsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import React from 'react';

function HistoryDetails({ partHistory, questions }) {
    const tooltipQues = (key, idx) => {
        let question = questions.find(q => q.id === idx)
        if (key == "A")
            return question.option_a
        else if (key == "B")
            return question.option_b
        else if (key == "C")
            return question.option_c
        else if (key == "D")
            return question.option_d
    }
    const sortedAnswers = [...partHistory.answers].sort(
        (a, b) =>
            a.question - b.question
    );
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead className="max-w-1/3">Câu hỏi</TableHead>
                    <TableHead>Đáp án</TableHead>
                    <TableHead>Trả lời</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedAnswers.map((ans, index) => {
                    return (
                        <TableRow
                            key={index}
                            className={
                                questions.find(q => q.id === ans.question).correct_answer === ans.user_answer
                                    ? "bg-green-100"
                                    : ans.user_answer
                                        ? "bg-red-100"
                                        : ""
                            }
                        >
                            <TableCell className="font-medium text-center">{index + 1}</TableCell>
                            <TableCell>{questions.find(q => q.id === ans.question).question_text}</TableCell>
                            <TableCell className="text-center">
                                <Tooltip>
                                    <TooltipTrigger>
                                        {questions.find(q => q.id === ans.question).correct_answer}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {tooltipQues(questions.find(q => q.id === ans.question).correct_answer, ans.question)}
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell className="text-center">
                                <Tooltip>
                                    <TooltipTrigger>
                                        {ans.user_answer || "-"}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {ans.user_answer && tooltipQues(ans.user_answer, ans.question)}
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>
                        Số cấu đúng đúng/Số câu trả lời/Số câu hỏi :
                    </TableCell>
                    <TableCell colSpan={2} className="text-right">
                        {partHistory.correct_answers}/{partHistory.total_answers}/{questions.length}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default HistoryDetails;
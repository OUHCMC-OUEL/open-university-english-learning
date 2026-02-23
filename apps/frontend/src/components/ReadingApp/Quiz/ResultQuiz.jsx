import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx";

import React, { useState, useEffect, useRef } from 'react';


function ResultQuiz({ partHistory, questions, setPartHistory }) {
  // const{ answers}=partHistory.answers;
  const answers = partHistory.answers.map((item, index) => ({
    ...item,
    id: index + 1
  }));
  return (
    <div className='flex w-5/6 items-start gap-4' >
      <Card>
        <CardHeader>
          <CardTitle>Điểm</CardTitle>
          <CardAction>{partHistory.score}/10</CardAction>
        </CardHeader>
        <CardContent>
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
              {answers.map((ans) => (
                <TableRow key={ans.id} className={
                  questions.find(q => q.id === ans.question)?.correct_answer === ans.user_answer
                    ? "bg-green-100"
                    : ans.user_answer ? "bg-red-100" : ""
                }>
                  <TableCell className="font-medium">{ans.id}</TableCell>
                  <TableCell>{questions.find(q => q.id === ans.question)?.question_text}</TableCell>
                  <TableCell>{questions.find(q => q.id === ans.question)?.correct_answer}</TableCell>
                  <TableCell>{ans.user_answer ? ans.user_answer : "-"}</TableCell>
                </TableRow>
              ))}
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
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full"
            onClick={() => window.location.reload()}
          >
            Làm bài khác
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ResultQuiz;
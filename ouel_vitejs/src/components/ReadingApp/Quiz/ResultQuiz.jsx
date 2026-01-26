import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import api, { endpoints } from "../../utils/api.js";


function ResultQuiz({ partHistory, questions,setPartHistory }) {
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
          {/* <CardDescription>Card Description</CardDescription> */}
          <CardAction>{partHistory.score}</CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            {/* <TableCaption>Điểm của bạn : {partHistory.score}</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead className="max-w-1/3">Câu hỏi</TableHead>
                <TableHead>Đáp án</TableHead>
                <TableHead>Trả lời</TableHead>
                {/* <TableHead className="text-right">Kết quả</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {answers.map((ans) => (
                <TableRow key={ans.id}>
                  <TableCell className="font-medium">{ans.id}</TableCell>
                  <TableCell>{questions.find(q => q.id === ans.question)?.question_text}</TableCell>
                  <TableCell>{questions.find(q => q.id === ans.question)?.correct_answer}</TableCell>
                  <TableCell>{ans.user_answer ? "ans.user_answer" : "Không có"}</TableCell>
                  {/* <TableCell className="text-right">{ans.is_correct?"Đúng":"Sai"}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>
                  Trả lời đúng/Số câu trả lời/Số câu hỏi :
                </TableCell>
                <TableCell colSpan={2} className="text-right">
                  {partHistory.correct_answers}/{partHistory.total_answers}/{questions.length}
                </TableCell>
                {/* <TableCell colSpan={2} className="text-right"> Điểm của bạn : {partHistory.score}</TableCell> */}
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full"  
          // onClick={() => {setPartHistory(null) }}
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
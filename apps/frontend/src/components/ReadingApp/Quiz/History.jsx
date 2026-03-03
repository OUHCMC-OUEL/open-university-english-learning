import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx";
import React from 'react';
import { formatTime } from "@/configs/formatTime";
import HistoryDetails from "./HistoryDetails";
import { TooltipProvider } from "@/components/ui/tooltip"

function History({ partHistory, questions,reset }) {
  return (
    <div className='flex w-5/6 items-start mt-4' >
      <Card>
        <CardHeader>
          <CardTitle>Kết quả</CardTitle>
          <CardDescription>
              <span className="text-gray-700 font-medium">
                Thời gian hoàn thành : {formatTime(partHistory.time)}
              </span>
            <p className="text-xs text-gray-400">
              Rê chuột vào đáp án và câu trả lời để xem chi tiết
            </p>
          </CardDescription>
          <CardAction>{partHistory.score}/10</CardAction>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <HistoryDetails
              partHistory={partHistory}
              questions={questions}
            />
          </TooltipProvider>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={ reset}>
            Làm bài khác
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default History;
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

function CourseCard({ course, progress }) {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(progress !== null
                ? `/courses/${course.id}/learn`
                : `/courses/${course.id}`)}
            className=" gap-2 mx-auto w-full max-w-sm p-0 shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1  cursor-pointer"
        >

            <CardHeader className="p-0">
                <div className="h-40 bg-muted relative ">
                    {course.image ? (
                        <img
                            src={course.image}
                            alt={course.name}
                            className="w-full h-full object-cover group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-[#368baa]/40" />
                        </div>
                    )}
                    <Badge className="absolute top-3 right-3 uppercase">
                        {course.level}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="mb-5">
                <CardDescription className="mb-2">{course.subject.name}</CardDescription>
                <CardTitle> {course.name}</CardTitle>
            </CardContent>
            <CardFooter className="mt-auto pb-5">
                {progress !== null ? (
                    <Field className="w-full max-w-sm">
                        <FieldLabel htmlFor="progress-upload" className="text-xs text-muted-foreground">
                            <span>Tiến độ</span>
                            <span className="ml-auto font-semibold text-primary" >{progress || 0} %</span>
                        </FieldLabel>
                        <Progress value={progress || 0} id="progress-upload" />
                    </Field>
                ) : (
                    <div className="flex gap-1.5 text-sm text-muted-foreground">
                        <Users className='w-4 h-5' />
                        <span>{course.student_count || 0} học viên</span>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

export default CourseCard

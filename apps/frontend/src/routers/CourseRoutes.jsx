import { Route } from "react-router-dom";
import CourseDetail from '@/pages/Course/CourseDetail';
import LearningWorkspace from '@/pages/Course/LearningWorkspace';
import PageTransition from '@/components/ui/page-transition';

export const CourseRoutes = (
    <>
        <Route path="/courses/:courseId" element={<PageTransition><CourseDetail /></PageTransition>} />
        <Route path="/courses/:courseId/learn" element={<PageTransition><LearningWorkspace /></PageTransition>} />
    </>
);
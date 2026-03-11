import { Route } from "react-router-dom";
import Reading from '@/pages/ReadingApp/Practice/Reading';
import Sentence from '@/pages/ReadingApp/Practice/Sentence';
import HomeReading from '@/pages/ReadingApp/Practice/HomePractice';
import PageTransition from '@/components/ui/page-transition';

export const ReadingRoutes = (
    <>
        <Route path="/reading" element={<PageTransition><HomeReading /></PageTransition>} />
        <Route path="/reading/exercise" element={<PageTransition><Reading /></PageTransition>} />
        <Route path="/reading/exercise/sentence" element={<PageTransition><Sentence /></PageTransition>} />
    </>
);
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/ui/page-transition';
import ScrollToTop from '@/components/ui/scroll-to-top';
import HomePage from '../pages/HomePage';
import Reading from '../pages/ReadingApp/Practice/Reading';
import Sentence from '@/pages/ReadingApp/Practice/Sentence';
import HomeReading from '../pages/ReadingApp/Practice/HomePractice';
import WritingApp from '../pages/WritingApp/WritingApp';
import Login from '../pages/login/Login'
import Register from '../pages/login/Register';
import OnboardingSetup from '../pages/login/OnboardingSetup';
import AccountDashboard from '../pages/login/AccountDashboard';
import Introduction from '../pages/Introduction';
import FAQ from '../pages/Faq';
import Contact from '../pages/Contact';
import CourseDashboard from '../pages/Course/CourseDashboard';
import CourseDetail from '../pages/Course/CourseDetail';
import LearningWorkspace from '../pages/Course/LearningWorkspace';
import PracticeDashboard from '../pages/Practice/PracticeDashboard';
import DailyQuestsTab from '@/pages/Course/DailyQuestTab';
import StudyGroupsTab from '@/pages/Course/StudyGroupTab';
import GroupWorkspace from '@/components/Courses/GroupWorkSpace';


const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
    <ScrollToTop />
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition><HomePage /></PageTransition>
          } />
          
          <Route path="/introduction" element={
            <PageTransition><Introduction /></PageTransition>
          } />
          
          <Route path="/faq" element={
            <PageTransition><FAQ /></PageTransition>
          } />

          <Route path="/contact" element={
            <PageTransition><Contact /></PageTransition>
          } />
          
          <Route path="/reading" element={
            <PageTransition><HomeReading/></PageTransition>
          }/> 

          <Route path="/writing" element={
            <PageTransition><WritingApp/></PageTransition>
          }/> 

          <Route path="/reading/exercise" element={
            <PageTransition><Reading/></PageTransition>
          }/>

          <Route path="/reading/exercise/sentence" element={
            <PageTransition><Sentence/></PageTransition>
          }/> 

          <Route path="/login" element={
            <PageTransition><Login/></PageTransition>
          }/>

          <Route path="/register" element={
            <PageTransition><Register /></PageTransition>
          } />

          <Route path="/onboarding" element={
            <PageTransition><OnboardingSetup /></PageTransition>
          } />

          <Route path="/account" element={
            <PageTransition><AccountDashboard /></PageTransition>
          } />

          <Route path="/courses/dashboard" element={<PageTransition><CourseDashboard /></PageTransition>} />
          <Route path="/courses/:courseId" element={<PageTransition><CourseDetail /></PageTransition>} />
          <Route path="/courses/:courseId/learn" element={<PageTransition><LearningWorkspace /></PageTransition>} />
          <Route path="/practice/dashboard" element={<PageTransition><PracticeDashboard /></PageTransition>} />
          <Route path="/mission/dashboard" element={<PageTransition><DailyQuestsTab /></PageTransition>} />
          <Route path="/group/dashboard" element={<PageTransition><StudyGroupsTab /></PageTransition>} />
          <Route path="/group/workspace" element={<PageTransition><GroupWorkspace /></PageTransition>} />

          <Route path="*" element={
            <PageTransition><HomePage /></PageTransition>
          } />
          
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
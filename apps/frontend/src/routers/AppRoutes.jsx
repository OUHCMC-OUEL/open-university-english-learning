import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ReadingRoutes } from './ReadingRoutes';
import WritingApp from '@/pages/WritingApp/WritingApp';
import PageTransition from '@/components/ui/page-transition';
import ScrollToTop from '@/components/ui/scroll-to-top';
import HomePage from '@/pages/HomePage';
import Introduction from '@/pages/Introduction';
import FAQ from '@/pages/Faq';
import Contact from '@/pages/Contact';
import { CourseRoutes } from './CourseRoutes';
import { LoginRoutes } from './LoginRoutes';
import HomeSpace from '@/pages/LearningSpace/HomeSpace';
import AccountDashboard from '@/pages/login/AccountDashboard';
const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {ReadingRoutes}
          {CourseRoutes}
          {LoginRoutes}
          <Route path="/home/space" element={<PageTransition><HomeSpace /></PageTransition>} />
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/introduction" element={<PageTransition><Introduction /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/writing" element={<PageTransition><WritingApp /></PageTransition>} />
          <Route path="*" element={<PageTransition><HomePage /></PageTransition>} />
                  <Route path="/account" element={<PageTransition><AccountDashboard /></PageTransition>} />
          
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
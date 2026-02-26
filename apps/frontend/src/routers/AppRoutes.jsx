import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/ui/page-transition';
import ScrollToTop from '@/components/ui/scroll-to-top';
import HomePage from '../pages/HomePage';
import Reading from '../pages/ReadingApp/Practice/Reading';
import HomeReading from '../pages/ReadingApp/Practice/HomePractice';
import WritingApp from '../pages/WritingApp/WritingApp';
import Login from '../pages/login/Login'
import Register from '../pages/login/Register';
import OnboardingSetup from '../pages/login/OnboardingSetup';
import AccountDashboard from '../pages/login/AccountDashboard';
import Introduction from '../pages/Introduction';
import FAQ from '../pages/Faq';
import Contact from '../pages/Contact';

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
          
          <Route path="*" element={
            <PageTransition><HomePage /></PageTransition>
          } />
          
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
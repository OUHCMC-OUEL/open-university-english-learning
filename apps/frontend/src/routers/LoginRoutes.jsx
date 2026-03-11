import { Route } from "react-router-dom";
import Login from '@/pages/login/Login'
import Register from '@/pages/login/Register';
import OnboardingSetup from '@/pages/login/OnboardingSetup';
// import AccountDashboard from '@/pages/login/AccountDashboard';
import PageTransition from '@/components/ui/page-transition';

export const LoginRoutes = (
    <>
        <Route path="/login" element={ <PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={ <PageTransition><Register /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><OnboardingSetup /></PageTransition>} />
        {/* <Route path="/account" element={<PageTransition><AccountDashboard /></PageTransition>} /> */}
    </>
);
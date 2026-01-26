import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PrivateRoute from './PrivateRoute';
import HomeReading from '../pages/ReadingApp/HomeReading';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reading" element={<HomeReading/>} />  
      <Route path="*" element={<div>Trang này không tồn tại!</div>} />
    </Routes>
  );
};

export default AppRoutes;
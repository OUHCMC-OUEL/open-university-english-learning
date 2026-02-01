import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Reading from '../pages/ReadingApp/Reading';
import HomeReading from '../pages/ReadingApp/HomeReading';
import WritingApp from '../pages/WritingApp/WritingApp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reading" element={<HomeReading/>}/> 
      <Route path="/writing" element={<WritingApp/>}/> 
      <Route path="/reading/exercise" element={<Reading/>}/> 
      <Route path="*" element={<div>Trang này không tồn tại!</div>} />
    </Routes>
  );
};

export default AppRoutes;
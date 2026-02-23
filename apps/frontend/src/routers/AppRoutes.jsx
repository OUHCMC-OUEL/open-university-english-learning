import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Reading from '../pages/ReadingApp/Practice/Reading';
import HomeReading from '../pages/ReadingApp/Practice/HomePractice';
import WritingApp from '../pages/WritingApp/WritingApp';
import Login from '../pages/login/Login'
import Register from '../pages/login/register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reading" element={<HomeReading/>}/> 
      <Route path="/writing" element={<WritingApp/>}/> 
      <Route path="/reading/exercise" element={<Reading/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>Trang này không tồn tại!</div>} />
    </Routes>
  );
};

export default AppRoutes;
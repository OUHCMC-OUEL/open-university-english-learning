import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import WritingApp from './WritingApp/WritingApp.jsx';
import QuizApp from './QuizApp/QuizApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/writing-app" element={<WritingApp />} />
        <Route path="/quiz-app" element={<QuizApp />} />
      </Routes>
    </BrowserRouter>,
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './configs/AuthContext.js'
import { ToastProvider } from '@/components/Context/toastContext.jsx';
import { AlertDialogProvider } from '@/components/Context/alertDialogContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastProvider>
      <AlertDialogProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </AlertDialogProvider>
    </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)

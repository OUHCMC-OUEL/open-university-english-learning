import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg, opts) => addToast(msg, "success", opts?.duration),
    error: (msg, opts) => addToast(msg, "error", opts?.duration),
    warning: (msg, opts) => addToast(msg, "warning", opts?.duration),
    info: (msg, opts) => addToast(msg, "info", opts?.duration),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed bottom-4 right-4 z-100 flex flex-col gap-2 pointer-events-none">

        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
        
      </div>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast phải nằm trong ToastProvider");
  return context;
};

const ToastItem = ({ toast, onClose }) => {
  const config = {
    success: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200" },
    error: { icon: XCircle, color: "text-red-500", bg: "bg-red-50 border-red-200" },
    warning: { icon: Info, color: "text-amber-500", bg: "bg-amber-50 border-amber-200" },
    info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50 border-blue-200" },
  };

  const { icon: Icon, color, bg } = config[toast.type] || config.info;

  return (
   <motion.div 
      layout 
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}  
      exit={{ opacity: 0, x: 20, scale: 0.9 }}   
      transition={{ duration: 0.25, ease: "easeOut" }}
      
      role="alert" 
      aria-live="assertive"
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg w-80 max-w-[90vw] ${bg}`}
    >
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
      <p className="flex-1 text-sm font-medium text-gray-800">{toast.message}</p>
      <button 
        onClick={onClose} 
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Đóng thông báo"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
import { createContext, useContext, useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, XCircle, Info, CheckCircle } from "lucide-react";

const AlertDialogContext = createContext();

export const AlertDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "",
    message: "",
    confirmText: "OK",
    type: "info",
    onConfirm: null,
  });

  const showAlert = useCallback((options) => {
    setConfig({
      title: options.title || "Thông báo",
      message: options.message || "",
      confirmText: options.confirmText || "Đã hiểu",
      type: options.type || "info",
      onConfirm: options.onConfirm || null,
    });
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    if (config.onConfirm) config.onConfirm();
    setIsOpen(false);
  };

  const icons = {
    error: <XCircle className="w-12 h-12 text-red-500 mb-4 mx-auto" />,
    warning: <AlertTriangle className="w-12 h-12 text-amber-500 mb-4 mx-auto" />,
    success: <CheckCircle className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />,
    info: <Info className="w-12 h-12 text-[#368baa] mb-4 mx-auto" />,
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert }}>
      {children}
      
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 animate-[fadeIn_0.2s_ease-out]" />
          
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-201 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl focus:outline-none animate-[zoomIn_0.2s_ease-out]">
            <div className="text-center">
              {icons[config.type]}
              
              <Dialog.Title className="text-xl font-bold text-gray-900 mb-2">
                {config.title}
              </Dialog.Title>
              
              <Dialog.Description className="text-gray-600 mb-6">
                {config.message}
              </Dialog.Description>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2.5 bg-[#368baa] hover:bg-[#2a6d85] text-white font-medium rounded-xl transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#368baa]"
                >
                  {config.confirmText}
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </AlertDialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) throw new Error("useAlertDialog phải nằm trong AlertDialogProvider");
  return context;
};
import { Users, AlertCircle, RefreshCw } from "lucide-react";

export const SkeletonLoading = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-16 w-full bg-gray-200 rounded-xl animate-pulse"></div>
    ))}
  </div>
);

export const EmptyState = ({ message, actionText, onAction }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Users className="w-16 h-16 text-gray-400 mb-4" />
    <p className="text-gray-500 text-lg mb-6">{message}</p>
    {actionText && (
      <button 
        onClick={onAction}
        className="px-6 py-2 bg-gray-100 text-[#368baa] hover:bg-gray-200 rounded-full font-medium transition"
      >
        {actionText}
      </button>
    )}
  </div>
);

export const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <p className="text-gray-600 mb-6">Không thể tải dữ liệu lúc này. Vui lòng kiểm tra kết nối.</p>
    <button 
      onClick={onRetry}
      className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-full transition"
    >
      <RefreshCw className="w-4 h-4" /> Tải lại
    </button>
  </div>
);
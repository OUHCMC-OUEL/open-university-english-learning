import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../configs/AuthContext'; 

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) 
    return <div>Đang kiểm tra quyền truy cập...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) 
    return <div>Đang kiểm tra quyền truy cập...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
import { Navigate } from 'react-router';
import { useUser } from '../components/context/UserContext';


export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUser();
  return currentUser ? children : <Navigate to="/login" replace />;
};
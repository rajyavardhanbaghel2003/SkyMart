import { Navigate } from 'react-router';
import { useUser } from '../components/context/UserContext';

export const GuestRoute = ({ children }) => {
  const { currentUser } = useUser();
  return !currentUser ? children : <Navigate to="/" replace />;
};
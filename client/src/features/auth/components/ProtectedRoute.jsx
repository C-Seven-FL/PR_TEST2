import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Spinner } from '@chakra-ui/react';
import { hasRequiredRole } from '../lib/userRole';

export function ProtectedRoute({ allowedRoles = [], redirectTo = '/dashboard' }) {
  const { isAuthenticated, isPending, role } = useAuth();
  const location = useLocation();

  if (isPending) {
    return (
      <Box minH="40vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="var(--brand-primary)" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (!hasRequiredRole(role, allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

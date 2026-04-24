import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Spinner } from '@chakra-ui/react';

export function PublicOnlyRoute() {
  const { isAuthenticated, isPending } = useAuth();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  if (isPending) {
    return (
      <Box minH="40vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="var(--brand-primary)" />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

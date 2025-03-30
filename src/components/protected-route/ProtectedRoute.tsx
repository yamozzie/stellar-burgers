import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState, useDispatch } from '../../services/store';
import { fetchUserProfile } from '../../services/slices/authSlice';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const hasTokens = Boolean(
    localStorage.getItem('refreshToken') &&
      document.cookie.includes('accessToken')
  );

  const [autologinAttempted, setAutologinAttempted] = useState(false);

  useEffect(() => {
    if (hasTokens && !isAuthenticated && !isLoading) {
      dispatch(fetchUserProfile())
        .unwrap()
        .catch((error) => {
          console.error('Ошибка автологина:', error);
        })
        .finally(() => {
          setAutologinAttempted(true);
        });
    } else {
      setAutologinAttempted(true);
    }
  }, [hasTokens, isAuthenticated, isLoading, dispatch]);

  if (!autologinAttempted || isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

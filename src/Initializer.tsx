import React, { useEffect } from 'react';
import { useDispatch } from './services/store';
import { fetchUserProfile } from './services/slices/authSlice';

interface InitializerProps {
  children: React.ReactNode;
}

const Initializer: React.FC<InitializerProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem('refreshToken') &&
      document.cookie.includes('accessToken')
    ) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default Initializer;

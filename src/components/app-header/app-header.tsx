import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.auth.user);
  const username = user ? user.name : '';

  return <AppHeaderUI userName={username} />;
};
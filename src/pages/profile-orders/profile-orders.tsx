import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { getCookie } from '../../utils/cookie';
import {
  WS_USER_ORDERS_CONNECT,
  WS_USER_ORDERS_DISCONNECT
} from '../../services/middleware/userOrderMiddleware';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.userOrders);

  useEffect(() => {
    let accessToken = getCookie('accessToken');
    if (accessToken?.startsWith('Bearer ')) {
      accessToken = accessToken.slice(7);
    }
    dispatch({
      type: WS_USER_ORDERS_CONNECT,
      payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`
    });

    return () => {
      dispatch({ type: WS_USER_ORDERS_DISCONNECT });
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

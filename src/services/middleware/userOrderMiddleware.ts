import { Middleware } from 'redux';
import {
  wsUserOrdersConnecting,
  wsUserOrdersOpen,
  wsUserOrdersClose,
  wsUserOrdersError,
  wsUserOrdersMessage
} from '../slices/userOrderSlice';

export const WS_USER_ORDERS_CONNECT = 'WS_USER_ORDERS_CONNECT';
export const WS_USER_ORDERS_DISCONNECT = 'WS_USER_ORDERS_DISCONNECT';

export const wsUserOrdersMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action: any) => {
    switch (action.type) {
      case WS_USER_ORDERS_CONNECT: {
        const url = action.payload as string;
        store.dispatch(wsUserOrdersConnecting());

        socket = new WebSocket(url);

        socket.onopen = () => {
          store.dispatch(wsUserOrdersOpen());
        };

        socket.onerror = () => {
          store.dispatch(wsUserOrdersError('Ошибка'));
        };

        socket.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);

          if (parsedData?.success) {
            store.dispatch(
              wsUserOrdersMessage({
                orders: parsedData.orders,
                total: parsedData.total,
                totalToday: parsedData.totalToday
              })
            );
          } else {
            store.dispatch(wsUserOrdersError('Ошибка данных'));
          }
        };

        socket.onclose = () => {
          store.dispatch(wsUserOrdersClose());
        };

        break;
      }

      case WS_USER_ORDERS_DISCONNECT: {
        if (socket) {
          socket.close();
        }
        socket = null;
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};

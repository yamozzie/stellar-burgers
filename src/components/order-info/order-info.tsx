import { FC, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { fetchFeed } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUserOrders } from '../../services/slices/userOrderSlice';
import { TOrder, TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const isModal = !!location.state?.background;
  const isProfile = location.pathname.startsWith('/profile/orders');

  const userOrders = useSelector((state) => state.userOrders.orders);
  const userOrdersLoading = useSelector((state) => state.userOrders.isLoading);

  const feedOrders = useSelector((state) => state.feed.orders);
  const feedLoading = useSelector((state) => state.feed.isLoading);

  const ingredients = useSelector((state) => state.ingredients.items);
  const ingredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  const orders = isProfile ? userOrders : feedOrders;
  const ordersLoading = isProfile ? userOrdersLoading : feedLoading;

  useEffect(() => {
    if (ingredients.length === 0 && !ingredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, ingredientsLoading]);

  useEffect(() => {
    if (!isProfile && orders.length === 0 && !ordersLoading) {
      dispatch(fetchFeed());
    }
  }, [dispatch, isProfile, orders.length, ordersLoading]);

  useEffect(() => {
    if (isProfile && orders.length === 0 && !ordersLoading) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isProfile, orders.length, ordersLoading]);

  const orderData = orders.find(
    (order: TOrder) => order.number === Number(number)
  );
  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) {
      return null;
    }

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const found = ingredients.find((ing) => ing._id === item);
        if (found) {
          if (!acc[item]) {
            acc[item] = { ...found, count: 1 };
          } else {
            acc[item].count++;
          }
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, ing) => acc + ing.price * ing.count,
      0
    );

    const date = new Date(orderData.createdAt);

    return {
      ...orderData,
      ingredientsInfo,
      total,
      date
    };
  }, [orderData, ingredients]);

  if (ordersLoading || ingredientsLoading || !orderInfo) {
    return <Preloader />;
  }

  if (isModal) {
    return <OrderInfoUI orderInfo={orderInfo} />;
  } else {
    return (
      <div>
        <h2 className='text text_type_main-large pb-5'>Детали заказа</h2>
        <OrderInfoUI orderInfo={orderInfo} />
      </div>
    );
  }
};

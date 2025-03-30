import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { addBun, addIngredient } from '../../services/slices/constructorSlice';
import { TBurgerIngredientProps } from './type';
import { BurgerIngredientUI } from '../ui/burger-ingredient';
import { TConstructorIngredient } from '../../utils/types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(
      (state) => state.burgerConstructor
    );

    const countInConstructor = ingredients.filter(
      (item) => item._id === ingredient._id
    ).length;
    const countBun = bun && bun._id === ingredient._id ? 2 : 0;
    const count = countInConstructor + countBun;

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient as TConstructorIngredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

// src/components/ingredient-details/ingredient-details.tsx

import React, { FC, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const isModal = !!location.state?.background;

  const { items, isLoading, isError } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  if (isLoading) {
    return <Preloader />;
  }
  if (isError) {
    return (
      <p className='text text_type_main-large'>
        Ошибка при загрузке ингредиентов
      </p>
    );
  }

  const ingredientData = items.find((item) => item._id === id);
  if (!ingredientData) {
    return <p className='text text_type_main-large'>Ингредиент не найден</p>;
  }

  if (isModal) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  } else {
    return (
      <div>
        <h2 className='text text_type_main-large pb-5'>Детали ингредиента</h2>
        <IngredientDetailsUI ingredientData={ingredientData} />
      </div>
    );
  }
};
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

describe('ingredientsSlice reducer', () => {
  test('should return the initial state by default', () => {
    const result = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  test('fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.isError).toBe(false);
    expect(result.items).toEqual([]);
  });

  test('fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Test Bun',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 200,
        price: 50,
        image: 'bun.png',
        image_large: 'bun-large.png',
        image_mobile: 'bun-mobile.png'
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.isError).toBe(false);
    expect(result.items).toEqual(mockIngredients);
  });

  test('fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.isError).toBe(true);
    expect(result.items).toEqual([]);
  });
});

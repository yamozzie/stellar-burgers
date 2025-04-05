import burgerConstructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  reorderIngredients,
  initialState
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';

describe('burgerConstructorSlice', () => {
  test('Возвращение initialState', () => {
    const result = burgerConstructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(result).toEqual(initialState);
  });

  test('addBun', () => {
    const mockBun: TIngredient = {
      _id: 'test-bun-id',
      name: 'Test Bun',
      type: 'bun',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: 'bun.png',
      image_large: 'bun-large.png',
      image_mobile: 'bun-mobile.png'
    };
    const action = addBun(mockBun);
    const result = burgerConstructorReducer(initialState, action);

    expect(result.bun).toEqual(mockBun);
    expect(result.ingredients).toHaveLength(0);
  });

  test('addIngredient (с сгенерированным id)', () => {
    const mockIngredient: TIngredient = {
      _id: 'test-ingr-id',
      name: 'Test Ingredient',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: 'sauce.png',
      image_large: 'sauce-large.png',
      image_mobile: 'sauce-mobile.png'
    };

    const action = addIngredient(mockIngredient);
    const result = burgerConstructorReducer(initialState, action);

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toMatchObject({
      _id: 'test-ingr-id',
      name: 'Test Ingredient',
      type: 'sauce'
    });
    expect(result.ingredients[0]).toHaveProperty('id');
  });

  test('removeIngredient', () => {
    const stateIngredient = {
      bun: null,
      ingredients: [
        {
          _id: 'test-ingr-id',
          name: 'Ingredient to remove',
          type: 'main',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 100,
          image: 'image.png',
          image_large: 'image-large.png',
          image_mobile: 'image-mobile.png',
          id: 'unique-123'
        }
      ]
    };
    const action = removeIngredient('unique-123');
    const result = burgerConstructorReducer(stateIngredient, action);

    expect(result.ingredients).toHaveLength(0);
  });

  test('reorderIngredients', () => {
    const stateIngredients = {
      bun: null,
      ingredients: [
        {
          _id: '111',
          name: 'First',
          type: 'main',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 100,
          image: 'first.png',
          image_large: 'first-large.png',
          image_mobile: 'first-mobile.png',
          id: '1'
        },
        {
          _id: '222',
          name: 'Second',
          type: 'main',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 200,
          image: 'second.png',
          image_large: 'second-large.png',
          image_mobile: 'second-mobile.png',
          id: '2'
        },
        {
          _id: '333',
          name: 'Third',
          type: 'main',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 300,
          image: 'third.png',
          image_large: 'third-large.png',
          image_mobile: 'third-mobile.png',
          id: '3'
        }
      ]
    };

    const action = reorderIngredients({ dragIndex: 0, hoverIndex: 2 });
    const result = burgerConstructorReducer(stateIngredients, action);

    expect(result.ingredients[0].id).toBe('2');
    expect(result.ingredients[1].id).toBe('3');
    expect(result.ingredients[2].id).toBe('1');
  });
});

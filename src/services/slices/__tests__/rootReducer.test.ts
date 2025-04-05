import { rootReducer } from '../../store';

describe('rootReducer', () => {
  test('Возвращение initialState если undefined или пустой action', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state).toBeDefined();
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
  });

  test('Возвращение стейта если неизвестный action', () => {
    const initialState = rootReducer(undefined, { type: '' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });
});

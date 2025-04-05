import authReducer, {
  registerUser,
  loginUser,
  initialState
} from '../authSlice';

describe('authSlice reducer', () => {
  test('Возврашение initialState', () => {
    const result = authReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  test('registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null
    });
  });

  test('registerUser.fulfilled', () => {
    const mockUser = { name: 'Bob', email: 'bob@example.com' };
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
  });

  test('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Регистрация не удалась'
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: 'Регистрация не удалась'
    });
  });

  test('loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const result = authReducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('loginUser.fulfilled', () => {
    const mockUser = { name: 'jason', email: 'jason@example.com' };
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
  });

  test('loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Не удалось авторизоваться'
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: 'Не удалось авторизоваться'
    });
  });
});

import { getCookie, setCookie, deleteCookie } from '../cookie';

describe('Проверка куков', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  test('Присвоение кука', () => {
    setCookie('testName', 'testValue');
    expect(document.cookie).toContain('testName=testValue');
  });

  test('Получение кука', () => {
    document.cookie = 'myCookie=myValue';
    const value = getCookie('myCookie');
    expect(value).toBe('myValue');
  });

  test('Возвращение undefined', () => {
    const value = getCookie('nonExisting');
    expect(value).toBeUndefined();
  });

  test('Удаление кука', () => {
    document.cookie = 'deleteMe=someValue';
    deleteCookie('deleteMe');
    expect(document.cookie).not.toContain('deleteMe=');
  });

  test('Присвоение кука с пропсом (expires)', () => {
    setCookie('testProp', 'propValue', { expires: 3600 });
    expect(document.cookie).toContain('testProp=propValue');
  });
});

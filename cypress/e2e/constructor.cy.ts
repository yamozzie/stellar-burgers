const INGREDIENT_CARD = '[data-cy="ingredient-card"]';
const CONSTRUCTOR_ZONE = '[data-cy="constructor-zone"]';
const ORDER_NUMBER = '[data-cy="order-number"]';
const CLOSE_BUTTON = '[data-cy="close-button"]';
const CONSTRUCTOR_EMPTY_BUN = '[data-cy="constructor-empty-bun"]';
const NO_INGREDIENTS_TEXT = '[data-cy="no_ingredients_text"]';

describe('Страница конструктора Stellar Burger', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.url().should('include', '/');
  });

  it('Тест 1: Отображение заголовка "Соберите бургер"', () => {
    cy.contains('Соберите бургер').should('exist');
  });

  it('Тест 2: Добавление ингредиента из списка в конструктор', () => {
    cy.get(INGREDIENT_CARD).first().as('firstIngredient');
    cy.get(CONSTRUCTOR_ZONE).as('constructor');
    cy.get('@firstIngredient').find('button').click();
    cy.get('@constructor').contains('Флюоресцентная булка').should('exist');
  });

  it('Тест 3: Создание заказа', () => {
    cy.get(INGREDIENT_CARD)
      .filter(':contains("Флюоресцентная булка")')
      .first()
      .find('button')
      .click();
    cy.get(INGREDIENT_CARD)
      .filter(':contains("Биокотлета из марсианской Магнолии")')
      .first()
      .find('button')
      .click();
    cy.get(CONSTRUCTOR_ZONE).as('constructor');
    cy.get('@constructor').should('contain', 'Флюоресцентная булка');
    cy.get('@constructor').should('contain', 'Биокотлета');
    cy.fixture('newOrder.json').then((newOrder) => {
      cy.intercept('POST', 'api/orders', newOrder).as('createOrder');
      cy.contains('Оформить заказ').click();
      cy.get(ORDER_NUMBER).should('contain', newOrder.order.number);
      cy.get(CLOSE_BUTTON).click();
      cy.get(CONSTRUCTOR_EMPTY_BUN).should('contain', 'Выберите булки');
      cy.get(NO_INGREDIENTS_TEXT).should('contain', 'Выберите начинку');
    });
  });

  it('Тест 4: Открытие и закрытие деталей ингредиента через изменение URL', () => {
    cy.get(INGREDIENT_CARD).first().find('a').click();
    cy.url().should('include', '/ingredients/');
    cy.contains('Детали ингредиента').should('exist');
    cy.go('back');
    cy.url().should('include', '/');
    cy.contains('Соберите бургер').should('exist');
  });
});
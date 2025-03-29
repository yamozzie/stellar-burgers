import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

interface IConstructorState {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
};

const initialState: IConstructorState = {
    bun: null,
    ingredients: []
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addBun: (state, action: PayloadAction<TIngredient>) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.ingredients.push(action.payload)
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients.filter(
                (item) => item.id !== action.payload
            );
        },
        clearConstructor(state) {
            state.bun = null;
            state.ingredients = [];
        },
        reorderIngredients: (
            state,
            action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
          ) => {
            const { dragIndex, hoverIndex } = action.payload;
            const dragged = state.ingredients[dragIndex];
            state.ingredients.splice(dragIndex, 1);
            state.ingredients.splice(hoverIndex, 0, dragged);
          },
    },
});

export const {
    addBun,
    addIngredient,
    removeIngredient,
    clearConstructor,
    reorderIngredients
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

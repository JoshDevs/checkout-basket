import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../../app/store";
import { BasketItem } from "../../../interfaces/BasketItem";
import { BasketState } from "../../../interfaces/BasketState";

const initialState: BasketState = {
  items: [],
  sum: 0,
};

const addToBasketReducer = produce((draft: BasketState, action: PayloadAction<BasketItem>) => {
  const item = draft.items.find((item) => item.sku === action.payload.sku);
  if (item) {
    item.quantity += action.payload.quantity;
  } else {
    draft.items.push(action.payload);
  }

  draft.sum = draft.items.reduce((accumulator, object) => accumulator + object.quantity, initialState.sum);
});

const removeFromBasketReducer = produce((draft: BasketState, action: PayloadAction<BasketItem>) => {
  const index = draft.items.findIndex((item) => item.sku === action.payload.sku);
  if (index !== -1) {
    draft.items[index].quantity -= action.payload.quantity;

    if (draft.items[index].quantity === 0) {
      draft.items = draft.items.filter((item) => item.sku !== action.payload.sku);
    }
  }

  draft.sum = draft.items.reduce((accumulator, object) => accumulator + object.quantity, initialState.sum);
});

const updateBasketReducer = produce((draft: BasketState, action: PayloadAction<BasketItem>) => {
  const index = draft.items.findIndex((item) => item.sku === action.payload.sku);

  if (index !== -1) {
    draft.items[index].quantity = action.payload.quantity;
  }

  draft.sum = draft.items.reduce((accumulator, object) => accumulator + object.quantity, initialState.sum);
});

const removeAllFromBasketReducer = produce((draft: BasketState, action: PayloadAction<{ sku: number }>) => {
  draft.items = draft.items.filter((item) => item.sku !== action.payload.sku);
  draft.sum = draft.items.reduce((accumulator, object) => accumulator + object.quantity, initialState.sum);
});

const resetBasketReducer = produce((draft: BasketState) => {
  draft.items = initialState.items;
  draft.sum = initialState.sum;
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: addToBasketReducer,
    removeFromBasket: removeFromBasketReducer,
    updateBasket: updateBasketReducer,
    removeAllFromBasket: removeAllFromBasketReducer,
    resetBasket: resetBasketReducer,
  },
});

export const { addToBasket, removeFromBasket, updateBasket, removeAllFromBasket, resetBasket } = basketSlice.actions;

export const selectBasketSum = (state: RootState) => state.basket.sum;

export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketItemBySku = (state: RootState, sku: number) => state.basket.items.find((item) => item.sku === sku);

export default basketSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../features/basket/basketButton/basketSlice";
import paymentSlice from "../features/payment/paymentSlice";
import productSlice from "../features/product/productList/productSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    productList: productSlice,
    payment: paymentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

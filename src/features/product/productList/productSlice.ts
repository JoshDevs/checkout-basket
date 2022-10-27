import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../../app/store";
import { ApiStatus } from "../../../enums/ApiStatus";
import { ProductState } from "../../../interfaces/ProductState";

const initialProductState: ProductState = {
  products: [],
  status: ApiStatus.IDLE,
  error: null,
};

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await fetch("productList");

  return await response.json();
});

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = ApiStatus.LOADING;
      })
      .addCase(
        fetchProducts.fulfilled,
        produce((draft, action) => {
          draft.status = ApiStatus.SUCCEEDED;
          draft.products = draft.products.concat(action.payload);
        }),
      )
      .addCase(
        fetchProducts.rejected,
        produce((state, action) => {
          state.status = ApiStatus.FAILED;
          state.error = action.error.message || "Error fetching products";
        }),
      );
  },
});

export default productSlice.reducer;

export const selectProductBySku = (state: RootState, sku: number) => state.productList.products.find((product) => product.sku === sku);

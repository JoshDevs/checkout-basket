import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { ApiStatus } from "../../enums/ApiStatus";
import { PaymentState } from "../../interfaces/PaymentState";

const initialState: PaymentState = {
  succeeded: null,
  status: ApiStatus.IDLE,
  error: null,
};

const resetPaymentReducer = produce((draft: PaymentState) => {
  draft.status = initialState.status;
  draft.error = initialState.error;
  draft.succeeded = initialState.succeeded;
});

export const fetchPayment = createAsyncThunk("payment/fetchPayment", async (body: string) => {
  const response = await fetch("pay", {
    method: "POST",
    body: body,
  });

  return await response.json();
});

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment: resetPaymentReducer,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPayment.pending, (state, action) => {
        state.status = ApiStatus.LOADING;
      })
      .addCase(
        fetchPayment.fulfilled,
        produce((draft, action) => {
          draft.status = ApiStatus.SUCCEEDED;
          draft.succeeded = action.payload;
        }),
      )
      .addCase(
        fetchPayment.rejected,
        produce((state, action) => {
          state.status = ApiStatus.FAILED;
          state.error = action.error.message || "Error fetching products";
        }),
      );
  },
});

export const { resetPayment } = paymentSlice.actions;

export const selectPaymentSuccess = (state: RootState) => state.payment.succeeded;
export const selectPaymentStatus = (state: RootState) => state.payment.status;

export default paymentSlice.reducer;

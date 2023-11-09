import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productState {
  productid: number;
}

const initialState: productState = {
  productid: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductid: (state, actions: PayloadAction<number>) => {
      state.productid = actions.payload;
    },
  },
});

export const { setProductid } = productSlice.actions;
export default productSlice.reducer;

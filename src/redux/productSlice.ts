import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productData {
  productid: number;
  productimage: string;
  rating: number;
  price: number;
  about: string;
  instock: boolean;
  heading: string;
}

const initialState: productData[] = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, actions: PayloadAction<productData[]>) => {
      return actions.payload;
    },
  },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductData {
  quantity?: number;
  productid: number;
  productimage: string;
  rating: number;
  price: number;
  about: string;
  instock: boolean;
  heading: string;
}

const initialState: ProductData[] = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, actions: PayloadAction<ProductData[]>) => {
      return actions.payload;
    },
  },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;

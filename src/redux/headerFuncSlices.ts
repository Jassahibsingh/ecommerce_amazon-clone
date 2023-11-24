import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface headerFuncStates {
  isSidebarOpen: boolean;
  isBackdropOpen: boolean;
  isLocModalOpen: boolean;
}

const initialState: headerFuncStates = {
  isSidebarOpen: false,
  isBackdropOpen: false,
  isLocModalOpen: false,
};

const headerFuncSlices = createSlice({
  name: "Header Functions",
  initialState,
  reducers: {
    setSidebarOpen: (state, actions: PayloadAction<boolean>) => {
      state.isSidebarOpen = actions.payload;
    },
    setBackdropOpen: (state, actions: PayloadAction<boolean>) => {
      state.isBackdropOpen = actions.payload;
    },
    setLocModalOpen: (state, actions: PayloadAction<boolean>) => {
      state.isLocModalOpen = actions.payload;
    },
  },
});

export const { setSidebarOpen, setBackdropOpen, setLocModalOpen } =
  headerFuncSlices.actions;
export default headerFuncSlices.reducer;

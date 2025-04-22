import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { TollRules } from '../mocks/types';

// Thunk for calculating toll fee
export const calculateToll = createAsyncThunk(
  'calculation/calculate',
  async ({ vehicleType, timestamp }: { vehicleType: string; timestamp: string }) => {
    const response = await fetch('/api/calculate-toll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicleType, timestamp }),
    });

    if (!response.ok) throw new Error('Failed to calculate toll');
    return await response.json();
  }
);

// Thunk for fetching toll rules
export const fetchTollRules = createAsyncThunk(
  'calculation/fetchRules',
  async () => {
    const response = await fetch('/api/toll-rules');
    if (!response.ok) throw new Error('Failed to fetch toll rules');
    return await response.json();
  }
);

interface CalculationState {
  currentFee: number | null;
  reason: string | null;
  isFree: boolean | null;
  tollRules: TollRules | null;
  loading: boolean;
  error: string | null;
}

const initialState: CalculationState = {
  currentFee: null,
  reason: null,
  isFree: null,
  tollRules: null,
  loading: false,
  error: null
};

const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    clearCalculation: (state) => {
      state.currentFee = null;
      state.reason = null;
      state.isFree = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle calculateToll
      .addCase(calculateToll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateToll.fulfilled, (state, action) => {
        state.currentFee = action.payload.fee;
        state.reason = action.payload.reason;
        state.isFree = action.payload.isFree;
        state.loading = false;
      })
      .addCase(calculateToll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to calculate toll';
      })
      // Handle fetchTollRules
      .addCase(fetchTollRules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTollRules.fulfilled, (state, action) => {
        state.tollRules = action.payload;
        state.loading = false;
      })
      .addCase(fetchTollRules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch toll rules';
      });
  }
});

export const { clearCalculation } = calculationSlice.actions;
export default calculationSlice.reducer;

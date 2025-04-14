import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TollPassage, DailyTollSummary } from '../mocks/types';

// Thunk for fetching passages by vehicle ID
export const fetchPassagesByVehicle = createAsyncThunk(
  'passages/fetchByVehicle',
  async (vehicleId: string) => {
    const response = await fetch(`/api/passages/${vehicleId}`);
    if (!response.ok) throw new Error('Failed to fetch passages');
    return await response.json();
  }
);

// Thunk for fetching passages by date and vehicle type
export const fetchPassagesByDate = createAsyncThunk(
  "passages/fetchByDate",
  async ({ date, vehicleId }: { date?: string; vehicleId?: string }) => {
    let url = "/api/passages";
    const params = new URLSearchParams();

    if (date) params.append("date", date);
    if (vehicleId) params.append("vehicleId", vehicleId);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch passages");
    return await response.json();
  }
);

// Thunk for recording a new passage
export const recordPassage = createAsyncThunk(
  'passages/record',
  async (passageData: { vehicleType: string; timestamp: string; location: string }) => {
    const response = await fetch('/api/passages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passageData),
    });

    if (!response.ok) throw new Error('Failed to record passage');
    return await response.json();
  }
);

interface PassagesState {
  items: TollPassage[];
  dailySummaries: DailyTollSummary[];
  loading: boolean;
  error: string | null;
}

const initialState: PassagesState = {
  items: [],
  dailySummaries: [],
  loading: false,
  error: null
};

const passagesSlice = createSlice({
  name: 'passages',
  initialState,
  reducers: {
    clearPassages: (state) => {
      state.items = [];
      state.dailySummaries = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPassagesByVehicle
      .addCase(fetchPassagesByVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPassagesByVehicle.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPassagesByVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch passages';
      })
      // Handle fetchPassagesByDate
      .addCase(fetchPassagesByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPassagesByDate.fulfilled, (state, action) => {
        state.dailySummaries = action.payload.dailySummaries || [];
        state.loading = false;
      })
      .addCase(fetchPassagesByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch passages';
      })
      // Handle recordPassage
      .addCase(recordPassage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recordPassage.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.loading = false;
      })
      .addCase(recordPassage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to record passage';
      });
  }
});

export const { clearPassages } = passagesSlice.actions;
export default passagesSlice.reducer;

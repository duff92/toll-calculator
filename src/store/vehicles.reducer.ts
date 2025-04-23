import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Vehicle } from '../mocks/types'

// Thunk for fetching all vehicles
export const fetchVehicles = createAsyncThunk('vehicles/fetchAll', async () => {
  const response = await fetch('/api/vehicles')
  if (!response.ok) throw new Error('Failed to fetch vehicles')
  const data = await response.json()
  return data.vehicles || data
})

// Thunk for fetching a vehicle by registration number
export const fetchVehicleByRegNumber = createAsyncThunk(
  'vehicles/fetchByRegNumber',
  async (regNumber: string) => {
    const response = await fetch(`/api/vehicles/${regNumber}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Vehicle not found')
      }
      throw new Error('Failed to fetch vehicle')
    }
    return await response.json()
  },
)

interface VehiclesState {
  items: Vehicle[]
  currentVehicle: Vehicle | null
  loading: boolean
  error: string | null
}

const initialState: VehiclesState = {
  items: [],
  currentVehicle: null,
  loading: false,
  error: null,
}

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    clearCurrentVehicle: (state) => {
      state.currentVehicle = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchVehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch vehicles'
      })
      // Handle fetchVehicleByRegNumber
      .addCase(fetchVehicleByRegNumber.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVehicleByRegNumber.fulfilled, (state, action) => {
        state.currentVehicle = action.payload
        state.loading = false
      })
      .addCase(fetchVehicleByRegNumber.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch vehicle'
        state.currentVehicle = null
      })
  },
})

export const { clearCurrentVehicle } = vehiclesSlice.actions
export default vehiclesSlice.reducer

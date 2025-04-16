import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import calculationReducer from './calculation.reducer'
import passagesReducer from './passages.reducer'
import vehiclesReducer from './vehicles.reducer'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  vehicles: vehiclesReducer,
  passages: passagesReducer,
  calculation: calculationReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

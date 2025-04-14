import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import calculationReducer from './calculation.reducer';
import passagesReducer from './passages.reducer';
import vehiclesReducer from './vehicles.reducer';

const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    passages: passagesReducer,
    calculation: calculationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

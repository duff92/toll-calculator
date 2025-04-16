import { useState } from 'react';

import { useAppDispatch, useAppSelector } from './redux-hooks'
import { fetchVehicleByRegNumber } from '../store/vehicles.reducer';

export const useVehicle = () => {
  const dispatch = useAppDispatch();
  const { loading, error, currentVehicle } = useAppSelector(state => state.vehicles);
  const [regNumber, setRegNumber] = useState('');

  const getVehicleByRegNumber = () => {
    if (regNumber.trim()) {
      dispatch(fetchVehicleByRegNumber(regNumber));
    }
  };

  return {
    regNumber,
    setRegNumber,
    getVehicleByRegNumber,
    loading,
    error,
    vehicle: currentVehicle
  };
};

import { useState, useEffect } from 'react';

import { calculateToll, fetchTollRules, clearCalculation } from '../store/calculation.reducer';
import { useAppDispatch, useAppSelector } from '../store/store';

/**
 * Custom hook for toll calculation functionality
 * Provides state and methods for the toll calculator feature
 */
export function useTollCalculation() {
  const dispatch = useAppDispatch();
  const {
    currentFee,
    reason,
    isFree,
    tollRules,
    loading,
    error
  } = useAppSelector(state => state.calculation);

  // Local form state
  const [vehicleType, setVehicleType] = useState('');
  const [timestamp, setTimestamp] = useState('');

  // Fetch toll rules when the component mounts
  useEffect(() => {
    dispatch(fetchTollRules());

    // Clear calculation data when unmounting
    return () => {
      dispatch(clearCalculation());
    };
  }, [dispatch]);

  // Calculate toll fee based on vehicle type and timestamp
  const calculateTollFee = () => {
    if (vehicleType && timestamp) {
      // Format timestamp to ISO string if needed
      const formattedTimestamp = new Date(timestamp).toISOString();
      dispatch(calculateToll({ vehicleType, timestamp: formattedTimestamp }));
    }
  };

  // Calculate toll with custom vehicle and time
  const calculateCustomToll = (customVehicleType: string, customTimestamp: string) => {
    dispatch(calculateToll({
      vehicleType: customVehicleType,
      timestamp: new Date(customTimestamp).toISOString()
    }));
  };

  return {
    // Form state
    vehicleType,
    setVehicleType,
    timestamp,
    setTimestamp,

    // Calculation results
    fee: currentFee,
    reason,
    isFree,
    tollRules,

    // Status
    loading,
    error,

    // Methods
    calculateToll: calculateTollFee,
    calculateCustomToll,

    // Reset method
    resetCalculation: () => dispatch(clearCalculation())
  };
}

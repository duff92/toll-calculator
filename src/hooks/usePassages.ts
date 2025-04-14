import { useState, useEffect } from 'react';

import { fetchPassagesByDate, fetchPassagesByVehicle } from '../store/passages.reducer';
import { useAppDispatch, useAppSelector } from '../store/store';

export function usePassages() {
  const dispatch = useAppDispatch();
  const {
    items: passages,
    dailySummaries,
    loading,
    error
  } = useAppSelector(state => state.passages);

  // Local state for filters
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');

  // Fetch passages when filters change
  useEffect(() => {
    if (selectedVehicleId) {
      dispatch(fetchPassagesByVehicle(selectedVehicleId));
    } else {
      dispatch(fetchPassagesByDate({
        date: selectedDate,
        vehicleType: selectedVehicleType || undefined
      }));
    }
  }, [dispatch, selectedDate, selectedVehicleType, selectedVehicleId]);

  // Helper function to format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to format time for display
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return {
    // Data
    passages,
    dailySummaries,

    // Status
    loading,
    error,

    // Filters
    selectedDate,
    setSelectedDate,
    selectedVehicleType,
    setSelectedVehicleType,
    selectedVehicleId,
    setSelectedVehicleId,

    // Helpers
    formatDate,
    formatTime,

    // Actions
    fetchPassagesByDate: (date?: string, vehicleType?: string) =>
      dispatch(fetchPassagesByDate({ date, vehicleType })),
    fetchPassagesByVehicle: (vehicleId: string) =>
      dispatch(fetchPassagesByVehicle(vehicleId))
  };
}

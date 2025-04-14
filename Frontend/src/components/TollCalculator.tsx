import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Alert,
} from '@mui/material';

const vehicleTypes = [
  'Car',
  'Motorbike',
  'Emergency',
  'Diplomat',
  'Bus',
  'Truck',
];

const freeVehicles = ['Motorbike', 'Emergency', 'Diplomat', 'Bus'];

const TollCalculator = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [fee, setFee] = useState<number | null>(null);

  const handleCalculate = () => {
    if (freeVehicles.includes(vehicleType)) {
      setFee(0);
      return;
    }

    // Mock logic — replace with real API logic later
    const hour = new Date(timestamp).getHours();
    let calculatedFee = 8;
    if (hour >= 7 && hour < 9) calculatedFee = 18;
    else if (hour >= 6 && hour < 7) calculatedFee = 13;
    else if (hour >= 16 && hour < 18) calculatedFee = 18;

    setFee(calculatedFee);
  };

  return (
    <Box mt={2} aria-live="polite">
      <TextField
        select
        label="Vehicle Type"
        fullWidth
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        margin="normal"
        inputProps={{ 'aria-label': 'vehicle type' }}
      >
        {vehicleTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type} {freeVehicles.includes(type) && '(No Fee)'}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="datetime-local"
        label="Toll Entry Time"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        disabled={!vehicleType || !timestamp}
        sx={{ mt: 2 }}
      >
        Calculate Fee
      </Button>

      {fee !== null && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Toll fee: {fee} SEK
        </Alert>
      )}
    </Box>
  );
};

export default TollCalculator;

import {
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

interface TollCalculatorProps {
  // Form values
  vehicleType: string;
  timestamp: string;
  onVehicleTypeChange: (vehicleType: string) => void;
  onTimestampChange: (timestamp: string) => void;

  // Calculation results
  fee: number | null;
  reason: string | null;

  // Status
  loading: boolean;
  error: string | null;

  // Available options
  vehicleTypes?: string[];

  // Actions
  onCalculate: () => void;
}

const TollCalculator = ({
  vehicleType,
  timestamp,
  onVehicleTypeChange,
  onTimestampChange,
  fee,
  reason,
  loading,
  error,
  vehicleTypes = ["Car", "Motorbike", "Emergency", "Diplomat", "Bus", "Truck"],
  onCalculate,
}: TollCalculatorProps) => {
  return (
    <Box mt={2} aria-live="polite">
      <TextField
        select
        label="Vehicle Type"
        fullWidth
        value={vehicleType}
        onChange={(e) => onVehicleTypeChange(e.target.value)}
        margin="normal"
        slotProps={{
          input: { 'aria-label': 'vehicle type' },
        }}
      >
        {vehicleTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="datetime-local"
        label="Toll Entry Time"
        fullWidth
        slotProps={{
          inputLabel: { shrink: true },
          input: { 'aria-label': 'toll entry time' },
        }}
        value={timestamp}
        onChange={(e) => onTimestampChange(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={onCalculate}
        disabled={!vehicleType || !timestamp || loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Calculate Fee'
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {fee !== null && !error && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Toll fee: {fee} SEK
          {reason && <div>{reason}</div>}
        </Alert>
      )}
    </Box>
  )
};

export default TollCalculator;

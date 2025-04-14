import {
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

const vehicleTypes = [
  "Car",
  "Motorbike",
  "Emergency",
  "Diplomat",
  "Bus",
  "Truck",
];

const TollCalculator = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [fee, setFee] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    setReason(null);

    try {
      // Format timestamp to ISO string if needed
      const formattedTimestamp = new Date(timestamp).toISOString();

      const response = await fetch("/api/calculate-toll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleType,
          timestamp: formattedTimestamp,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate toll fee");
      }

      const data = await response.json();
      setFee(data.fee);
      setReason(data.reason);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setFee(null);
    } finally {
      setLoading(false);
    }
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
        inputProps={{ "aria-label": "vehicle type" }}
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
        InputLabelProps={{ shrink: true }}
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        disabled={!vehicleType || !timestamp || loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Calculate Fee"
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
  );
};

export default TollCalculator;

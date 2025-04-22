import { Box, Typography } from "@mui/material";

import TollCalculator from "../components/TollCalculator";
import { useTollCalculation } from "../hooks/useTollCalculation";

const CalculateTollPage = () => {

  const {
    vehicleType,
    setVehicleType,
    timestamp,
    setTimestamp,
    fee,
    reason,
    loading,
    error,
    calculateToll,
  } = useTollCalculation();

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Calculate Toll
      </Typography>

      <TollCalculator
        vehicleType={vehicleType}
        onVehicleTypeChange={setVehicleType}
        timestamp={timestamp}
        onTimestampChange={setTimestamp}
        onCalculate={calculateToll}
        fee={fee}
        reason={reason}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default CalculateTollPage;

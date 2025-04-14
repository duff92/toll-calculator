import { Box, Container, Typography, Alert } from "@mui/material";

import RegNumberInput from "../components/RegNumberInput";
import TollCalculator from "../components/TollCalculator";
import { useTollCalculation } from "../hooks/useTollCalculation";
import { useVehicle } from "../hooks/useVehicle";

const TollsPage = () => {
  const {
    regNumber,
    setRegNumber,
    getVehicleByRegNumber,
    vehicle,
    loading: vehicleLoading,
    error: vehicleError,
  } = useVehicle();

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
    <Container maxWidth="sm" component="main">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Toll Calculator
        </Typography>

        <RegNumberInput
          value={regNumber}
          onChange={setRegNumber}
          onSubmit={getVehicleByRegNumber}
          loading={vehicleLoading}
          error={vehicleError}
        />

        {vehicle && (
          <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
            Vehicle found: {vehicle.make} {vehicle.model}  ({vehicle.type})
          </Alert>
        )}

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
    </Container>
  );
}

export default TollsPage;

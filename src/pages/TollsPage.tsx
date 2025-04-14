import { Box, Container, Typography } from "@mui/material";


import RegNumberInput from "../components/RegNumberInput";
import TollCalculator from "../components/TollCalculator";
import VehicleInformation from "../components/VehicleInformation";
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
    <Container maxWidth="md" component="main">
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
          <VehicleInformation vehicle={vehicle} />
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

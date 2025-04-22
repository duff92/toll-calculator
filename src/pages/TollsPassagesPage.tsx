import { Box, Typography } from '@mui/material'

import PassagesList from '../components/PassagesList'
import RegNumberInput from '../components/RegNumberInput'
import VehicleInformation from '../components/VehicleInformation'
import { useVehicle } from '../hooks/useVehicle'

const TollsPassagesPage = () => {
  const {
    regNumber,
    setRegNumber,
    getVehicleByRegNumber,
    vehicle,
    loading: vehicleLoading,
    error: vehicleError,
  } = useVehicle()

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter registration number
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Then we will show the toll passages for the car
      </Typography>

      <RegNumberInput
        value={regNumber}
        onChange={setRegNumber}
        onSubmit={getVehicleByRegNumber}
        loading={vehicleLoading}
        error={vehicleError}
      />

      {vehicle && (
        <>
          <VehicleInformation vehicle={vehicle} />

          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h5" component="h2">
              Passage History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing toll passages for this vehicle
            </Typography>
          </Box>

          <PassagesList vehicleId={vehicle.id} />
        </>
      )}
    </Box>
  )
}

export default TollsPassagesPage

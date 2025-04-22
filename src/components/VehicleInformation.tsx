import BrushIcon from "@mui/icons-material/Brush";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ToysIcon from "@mui/icons-material/Toys";
import { Box, Typography, Paper, Grid, Stack, useTheme } from "@mui/material";

import { Vehicle } from "@/mocks/types";

interface VehicleInformationProps {
  vehicle: Vehicle | null;
}

const VehicleInformation = ({ vehicle }: VehicleInformationProps) => {
  const theme = useTheme();
  if (!vehicle) {
    return null;
  }

  return (
    <Paper sx={{ mt: 2 }}>
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
          bgcolor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.grey[100],
        }}
      >
        <Typography variant="h3" component="h2">
          {vehicle.make} {vehicle.model}
        </Typography>
        <Typography variant="body1">{vehicle.registrationNumber}</Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ToysIcon />
              <Stack>
                <Typography variant="body1">
                  <strong>{vehicle.type}</strong>
                </Typography>
                <Typography variant="body2">Type</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarMonthIcon />

              <Stack>
                <Typography variant="body1">
                  <strong>{vehicle.year}</strong>
                </Typography>
                <Typography variant="body2">Year</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <BrushIcon />

              <Stack>
                <Typography variant="body1">
                  <strong>{vehicle.color}</strong>
                </Typography>
                <Typography variant="body2">Color</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
};

export default VehicleInformation;

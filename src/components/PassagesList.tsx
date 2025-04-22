import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Stack,
  Divider
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { useEffect } from "react";

import { usePassages } from "../hooks/usePassages";
import { DailyTollSummary, TollPassage } from '../mocks/types'

interface PassagesListProps {
  vehicleId?: string;
}

const PassagesList: React.FC<PassagesListProps> = ({ vehicleId }) => {
  const {
    passages,
    dailySummaries,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    selectedVehicleType,
    setSelectedVehicleType,
    setSelectedVehicleId,
    formatDate,
    formatTime
  } = usePassages();

  // Use useEffect to set the vehicle ID when it changes
  useEffect(() => {
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
    }
  }, [vehicleId, setSelectedVehicleId]);

  const vehicleTypes = [
    "Car",
    "Motorbike",
    "Emergency",
    "Diplomat",
    "Bus",
    "Truck",
    "Military",
    "Foreign",
    "Tractor"
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (vehicleId && passages.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        No passages found for this vehicle.
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {!vehicleId && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Filter Passages
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={new Dayjs(selectedDate)}
                onChange={(newDate) => {
                  if (newDate) {
                    setSelectedDate(newDate.toISOString().split('T')[0])
                  }
                }}
                sx={{ flex: 1 }}
              />
            </LocalizationProvider>

            <TextField
              select
              label="Vehicle Type"
              value={selectedVehicleType}
              onChange={(e) => setSelectedVehicleType(e.target.value)}
              sx={{ flex: 1 }}
            >
              <MenuItem value="">All Vehicle Types</MenuItem>
              {vehicleTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Paper>
      )}

      {dailySummaries && dailySummaries.length > 0 ? (
        dailySummaries.map((summary: DailyTollSummary) => (
          <Paper key={summary.date} sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <Typography variant="h6" component="h3">
                {formatDate(summary.date)}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body1">
                  {summary.passages.length} passage
                  {summary.passages.length !== 1 ? 's' : ''}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" fontWeight="bold">
                    Total: {summary.totalFee} SEK
                  </Typography>
                  {summary.maxDailyFeeApplied && (
                    <Chip
                      label="Max daily fee applied"
                      size="small"
                      color="secondary"
                    />
                  )}
                </Stack>
              </Box>
            </Box>

            <Divider />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell align="right">Fee</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summary.passages.map((passage: TollPassage) => (
                    <TableRow key={passage.id}>
                      <TableCell>{formatTime(passage.timestamp)}</TableCell>
                      <TableCell>{passage.location}</TableCell>
                      <TableCell align="right">
                        {passage.fee === 0 ? (
                          <Chip label="Free" size="small" color="success" />
                        ) : (
                          `${passage.fee} SEK`
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))
      ) : (
        <Alert severity="info">
          No passages found for the selected filters.
        </Alert>
      )}
    </Box>
  )
};

export default PassagesList;

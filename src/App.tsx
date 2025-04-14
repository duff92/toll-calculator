import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import TollCalculator from "./components/TollCalculator";

export default function App() {
  return (
    <Container maxWidth="sm" component="main">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Toll Calculator
        </Typography>
        <TollCalculator />
      </Box>
    </Container>
  );
}

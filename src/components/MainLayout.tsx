import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
            startIcon={<MenuIcon />}
          >
            Menu
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Toll Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;

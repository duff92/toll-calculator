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

import Sidebar from '@/components/Sidebar'
import SkipLink from '@/components/SkipLink'
import ThemeToggle from '@/components/ThemeToggle'

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Add skip to main content link */}
      <SkipLink />

      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
            startIcon={<MenuIcon />}
            aria-label="Open menu"
          >
            Menu
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {import.meta.env.VITE_TITLE}
          </Typography>

          {/* Add the theme toggle button */}
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Container
        component="main"
        id="main-content"
        sx={{
          flexGrow: 1,
          py: 3,
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: (t) => `2px solid ${t.palette.primary.main}`,
            outlineOffset: '4px',
          },
        }}
        tabIndex={-1} // Makes the container focusable for skip link but not in tab order
      >
        <Outlet />
      </Container>
    </Box>
  )
}

export default MainLayout;

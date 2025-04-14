import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  DirectionsCar as VehiclesIcon,
  Receipt as PassagesIcon,
  Calculate as CalculateIcon,
  Settings as SettingsIcon
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  width = 240
}) => {
  const navItems = [
    { text: "Vehicles", icon: <VehiclesIcon />, path: "/vehicles" },
    { text: "Toll Passages", icon: <PassagesIcon />, path: "/passages" },
    { text: "Calculate Toll", icon: <CalculateIcon />, path: "/calculate" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          backgroundColor: (theme) => theme.palette.background.default
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Toll Calculator
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={onClose}
            sx={{
              color: "text.primary",
              "&.active": {
                backgroundColor: "action.selected",
                "& .MuiListItemIcon-root": {
                  color: "primary.main",
                }
              },
              "&:hover": {
                backgroundColor: "action.hover",
              }
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

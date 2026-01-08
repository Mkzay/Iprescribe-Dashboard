import {
  Stack,
  IconButton,
  Typography,
  Switch,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useState } from "react";
import NotificationIcon from "../assets/icons/notification.svg?react";
import ChevronDownIcon from "../assets/icons/chevron-down.svg?react";
import { useThemeStore } from "../store/themeStore";

interface TopBarProps {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
}

export default function TopBar({
  onSidebarToggle,
  sidebarOpen = true,
}: TopBarProps) {
  const { mode, toggleMode } = useThemeStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    handleClose();
  };

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "12px 40px",
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        gap: 3,
      }}
    >
      <IconButton size="small" onClick={onSidebarToggle} sx={{ mr: "auto" }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </IconButton>

      <Stack direction="row" spacing={1.125} alignItems="center">
        <Typography
          sx={{ fontSize: "14px", fontWeight: 500, color: "text.secondary" }}
        >
          {mode === "light" ? "☀️" : "🌙"}
        </Typography>
        <Switch checked={mode === "dark"} onChange={toggleMode} size="small" />
      </Stack>

      <IconButton size="small">
        <NotificationIcon width={18} height={22} style={{ color: "#6C7278" }} />
      </IconButton>

      <div className="w-px h-[41px] bg-[#DCE4E8] dark:bg-gray-700" />

      <Stack
        direction="row"
        spacing={1.375}
        alignItems="center"
        onClick={handleProfileClick}
        sx={{ cursor: "pointer" }}
      >
        <img
          src="/avatar.jpg"
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
        <Stack spacing={0.25}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Alexandro
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "primary.light",
            }}
          >
            Admin
          </Typography>
        </Stack>
        <ChevronDownIcon width={8} height={4} style={{ color: "#6C7278" }} />
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: "8px",
            minWidth: 200,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontSize: "14px" }}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontSize: "14px" }}>Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ fontSize: "14px", color: "error.main" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Stack>
  );
}

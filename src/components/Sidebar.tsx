import { Stack, Typography } from "@mui/material";
import DashboardIcon from "../assets/icons/dashboard.svg?react";
import UsersIcon from "../assets/icons/users.svg?react";
import CardIcon from "../assets/icons/card.svg?react";
import ShopIcon from "../assets/icons/shop.svg?react";
import WalletIcon from "../assets/icons/wallet.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import TaskIcon from "../assets/icons/task.svg?react";
import StarIcon from "../assets/icons/star.svg?react";
import ReceiptIcon from "../assets/icons/receipt.svg?react";

const mainMenuItems = [
  { id: "dashboard", label: "Dashboard", Icon: DashboardIcon },
  { id: "users", label: "User Management", Icon: UsersIcon },
  { id: "consult", label: "Consult. & Presp.", Icon: CardIcon },
  { id: "pharmacy", label: "Pharm. & Orders Mgt.", Icon: ShopIcon },
  { id: "payments", label: "Payments", Icon: WalletIcon },
];

const adminMenuItems = [
  { id: "settings", label: "Settings", Icon: SettingsIcon },
  { id: "roles", label: "Roles & Permissions", Icon: CardIcon },
  { id: "activity", label: "Activity Log", Icon: TaskIcon },
  { id: "blog", label: "Blog / Health Tips", Icon: TaskIcon },
  { id: "notifications", label: "Notifications Mgt.", Icon: StarIcon },
  { id: "website", label: "Website Updates", Icon: ReceiptIcon },
];

interface SidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen?: boolean;
}

export default function Sidebar({
  activeItem,
  onItemClick,
  isOpen = true,
}: SidebarProps) {
  return (
    <Stack
      sx={{
        width: "252px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #283C85 0%, #0A0E1A 100%)",
        padding: "8px 0",
        gap: "4px",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        zIndex: 1000,
      }}
    >
      <div className="flex justify-start pl-4">
        <img
          src="/logo-sidebar.png"
          alt="iPrescribe"
          style={{
            width: "75%",
            height: "auto",
            maxWidth: "170px",
            opacity: 1,
            objectFit: "contain",
          }}
        />
      </div>

      <Stack spacing={1.5}>
        <Stack spacing={1}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "white",
              px: 2.5,
            }}
          >
            Main Menu
          </Typography>
          <Stack spacing={0.5}>
            {mainMenuItems.map((item) => (
              <div key={item.id} className="animate-slideInLeft">
                <div className="relative">
                  {activeItem === item.id && (
                    <div className="absolute left-0 w-[5px] h-[34px] bg-white rounded-r-[20px]" />
                  )}
                  <Stack
                    direction="row"
                    spacing={1.5}
                    onClick={() => onItemClick(item.id)}
                    sx={{
                      alignItems: "center",
                      backgroundColor:
                        activeItem === item.id ? "#FFFFFF" : "transparent",
                      borderRadius: "44px 0 0 44px",
                      padding: "8px 20px 8px 32px",
                      backdropFilter: activeItem === item.id ? "none" : "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor:
                          activeItem === item.id
                            ? "#FFFFFF"
                            : "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <item.Icon
                      width={16}
                      height={16}
                      style={{
                        color: activeItem === item.id ? "#283C85" : "white",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: activeItem === item.id ? "#283C85" : "white",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Stack>
                </div>
              </div>
            ))}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "white",
              px: 2.5,
            }}
          >
            Admin Menu
          </Typography>
          <Stack spacing={0.5}>
            {adminMenuItems.map((item) => (
              <div key={item.id} className="animate-slideInLeft">
                <Stack
                  direction="row"
                  spacing={1.5}
                  onClick={() => onItemClick(item.id)}
                  sx={{
                    alignItems: "center",
                    backgroundColor:
                      activeItem === item.id ? "#FFFFFF" : "transparent",
                    borderRadius: "44px 0 0 44px",
                    padding: "8px 20px 8px 32px",
                    backdropFilter: activeItem === item.id ? "none" : "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor:
                        activeItem === item.id
                          ? "#FFFFFF"
                          : "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <item.Icon
                    width={16}
                    height={16}
                    style={{ color: "white" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "white",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              </div>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

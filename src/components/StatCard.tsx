import { Stack, Typography } from "@mui/material";
import ArrowDownIcon from "../assets/icons/arrow-down.svg?react";
import PeopleGreenIcon from "../assets/icons/people-green.svg?react";
import PeopleBlueIcon from "../assets/icons/people-blue.svg?react";
import PrescriptionIcon from "../assets/icons/prescription.svg?react";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  change,
  icon,
  color,
  delay = 0,
}: StatCardProps) {
  const iconMap: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    "people-green": PeopleGreenIcon,
    "people-blue": PeopleBlueIcon,
    prescription: PrescriptionIcon,
  };

  const IconComponent = iconMap[icon] || PeopleGreenIcon;

  return (
    <div
      className="animate-fadeInUp hover:scale-[1.02] transition-transform"
      style={{ animationDelay: `${delay}s` }}
    >
      <Stack
        direction="row"
        sx={{
          backgroundColor: color,
          borderRadius: "10px",
          padding: "20px",
          gap: 2.5,
          minWidth: "236px",
        }}
      >
        <Stack spacing={1.5} flex={1}>
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "28.8px",
                color: "text.primary",
              }}
            >
              {value}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <ArrowDownIcon
                width={9}
                height={12}
                style={{ color: "#E15C7A" }}
              />
              <Typography
                sx={{ fontSize: "14px", fontWeight: 500, color: "#E15C7A" }}
              >
                {Math.abs(change * 100).toFixed(1)}%
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              Since last week
            </Typography>
          </Stack>
        </Stack>
        <IconComponent width={31} height={31} style={{ flexShrink: 0 }} />
      </Stack>
    </div>
  );
}

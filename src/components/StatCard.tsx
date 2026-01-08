import { Stack, Typography } from '@mui/material';
import ArrowDownIcon from '../assets/icons/arrow-down.svg?react';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
  delay?: number;
}

export default function StatCard({ title, value, change, icon, color, delay = 0 }: StatCardProps) {
  const iconMap: Record<string, string> = {
    'people-green': '/src/assets/icons/people-green.svg',
    'people-blue': '/src/assets/icons/people-blue.svg',
    'prescription': '/src/assets/icons/prescription.svg',
  };

  return (
    <div className="animate-fadeInUp hover:scale-[1.02] transition-transform" style={{ animationDelay: `${delay}s` }}>
      <Stack
        direction="row"
        sx={{
          backgroundColor: color,
          borderRadius: '10px',
          padding: '20px',
          gap: 2.5,
          minWidth: '236px',
        }}
      >
        <Stack spacing={1.5} flex={1}>
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '28.8px',
                color: 'text.primary',
              }}
            >
              {value}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <ArrowDownIcon width={9} height={12} style={{ color: '#E15C7A' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#E15C7A' }}>
                {Math.abs(change * 100).toFixed(1)}%
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'text.secondary' }}>
              Since last week
            </Typography>
          </Stack>
        </Stack>
        <img src={iconMap[icon]} alt={title} className="w-[31px] h-[31px]" />
      </Stack>
    </div>
  );
}
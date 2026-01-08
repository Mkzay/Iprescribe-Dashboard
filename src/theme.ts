import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#283C85',
          light: '#5A78E7',
          dark: '#1A2C5E',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#43B4BC',
          light: '#6FCFFF',
          contrastText: '#FFFFFF',
        },
        error: {
          main: '#E15C7A',
          light: '#FF8BA3',
          contrastText: '#FFFFFF',
        },
        success: {
          main: '#1C8C6E',
          contrastText: '#FFFFFF',
        },
        warning: {
          main: '#FF9900',
          contrastText: '#FFFFFF',
        },
        text: {
          primary: '#1A1C1E',
          secondary: '#6C7278',
          disabled: '#9E9E9E',
        },
        background: {
          default: '#F5F7FA',
          paper: '#FFFFFF',
        },
        grey: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        divider: '#DCE4E8',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#5A78E7',
          light: '#7B92FF',
          dark: '#3B5AC7',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#43B4BC',
          light: '#6FCFFF',
          contrastText: '#000000',
        },
        error: {
          main: '#E15C7A',
          light: '#FF8BA3',
          contrastText: '#FFFFFF',
        },
        success: {
          main: '#1C8C6E',
          contrastText: '#FFFFFF',
        },
        warning: {
          main: '#FF9900',
          contrastText: '#000000',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B0B7BE',
          disabled: '#6C7278',
        },
        background: {
          default: '#0A0E1A',
          paper: '#141827',
        },
        grey: {
          50: '#1F2937',
          100: '#374151',
          200: '#4B5563',
          300: '#6B7280',
          400: '#9CA3AF',
          500: '#D1D5DB',
          600: '#E5E7EB',
          700: '#F3F4F6',
          800: '#F9FAFB',
          900: '#FFFFFF',
        },
        divider: '#2D3748',
      },
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
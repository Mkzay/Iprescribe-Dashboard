# iPrescribe Dashboard

A modern healthcare admin dashboard built with React, TypeScript, MUI v7, and Tailwind CSS v4.

## Features

- ✅ **Login Page** - Email/password authentication with form validation
- ✅ **Dashboard Layout** - Sidebar navigation, top bar with user profile
- ✅ **Statistics Cards** - Animated cards showing key metrics
- ✅ **Charts & Analytics** - Line, bar, and pie charts for data visualization
- ✅ **Patients Table** - Searchable and sortable data grid
- ✅ **Dark/Light Mode** - Theme toggle with persistent preference
- ✅ **Form Validation** - Email and password validation on login
- ✅ **Animations** - Smooth transitions using Framer Motion
- ✅ **Responsive Design** - Mobile-friendly layout

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **MUI v7** - Component library
- **Tailwind CSS v4** - Utility-first CSS
- **Zustand** - State management
- **TanStack Query** - Data fetching
- **CSS Animations** - Smooth transitions and effects
- **MUI X Charts** - Data visualization
- **MUI X Data Grid** - Table component

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── assets/          # Icons and images
├── components/      # Reusable components
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── StatCard.tsx
│   └── PatientsTable.tsx
├── data/            # Mock data
├── pages/           # Page components
│   ├── Login.tsx
│   └── Dashboard.tsx
├── store/           # Zustand stores
├── types/           # TypeScript types
├── theme.ts         # MUI theme configuration
└── main.tsx         # App entry point
```

## Login Credentials

The login form includes validation:
- Email must be valid format
- Password must be at least 8 characters

Use any valid email/password combination to access the dashboard.

## Features Demo

### Dark/Light Mode
Toggle between themes using the switch in the top bar.

### Table Search
Filter patients by name, email, or location in real-time.

### Interactive Charts
- **Consultation Over Time** - Line chart tracking consultations
- **Prescription Volume** - Trend analysis
- **Doctors vs Patients** - Comparative bar chart
- **Top Specialties** - Pie chart showing demand

### Animations
- Cards animate on mount with stagger effect using CSS keyframes
- Sidebar items fade in with slide-left animation
- Smooth hover effects on interactive elements
- CSS-based transitions for better performance

## Customization

### Theme
Edit `src/theme.ts` to customize colors, typography, and spacing.

### Mock Data
Update `src/data/mockData.ts` to change dashboard statistics.

### Navigation
Modify `src/components/Sidebar.tsx` to add/remove menu items.

## License

MIT
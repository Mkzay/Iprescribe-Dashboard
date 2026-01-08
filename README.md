# iPrescribe Dashboard

A modern healthcare admin dashboard built with React, TypeScript, MUI v7, and Tailwind CSS v4. Features real-time API integration, dark mode, collapsible navigation, and CSV export capabilities.

## Features

- ✅ **Authentication** - Secure login with token-based authentication
- ✅ **API Integration** - Connected to staging backend with live data
- ✅ **Dashboard Analytics** - Real-time statistics and metrics
- ✅ **Interactive Charts** - Line, bar, and pie charts with live data
- ✅ **Patient Management** - Searchable and sortable data grid with pagination
- ✅ **CSV Export** - Download dashboard data and patient records
- ✅ **Dark/Light Mode** - Theme toggle with localStorage persistence
- ✅ **Collapsible Sidebar** - Toggle navigation with hamburger menu
- ✅ **Profile Dropdown** - User menu with profile, settings, and logout
- ✅ **Responsive Design** - Optimized for all screen sizes
- ✅ **Form Validation** - Real-time email and password validation
- ✅ **Smooth Animations** - CSS-based transitions and effects

## Tech Stack

- **React 18.3.1** - UI library with hooks
- **TypeScript 5.7.2** - Type safety
- **Vite 6.0.5** - Fast build tool (dev server on port 3000)
- **MUI v7.0.0** - Material Design components
- **Tailwind CSS v4.0.0** - Utility-first CSS framework
- **Zustand 5.0.2** - Lightweight state management
- **TanStack Query 5.62.11** - Data fetching and caching
- **MUI X Charts** - Data visualization
- **MUI X Data Grid** - Advanced table component
- **Emotion** - CSS-in-JS styling
- **vite-plugin-svgr** - SVG as React components

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Iprescribe Dashboard"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=https://stagingapi.iprescribe.online/api/v1
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── assets/
│   └── icons/           # SVG icons (imported as React components)
├── components/          # Reusable UI components
│   ├── Sidebar.tsx      # Collapsible navigation with gradient background
│   ├── TopBar.tsx       # Header with theme toggle and profile dropdown
│   ├── StatCard.tsx     # Animated metric cards
│   └── PatientsTable.tsx # Data grid with search and pagination
├── data/
│   └── mockData.ts      # Fallback mock data
├── lib/
│   └── api.ts           # API client with authentication
├── pages/               # Page-level components
│   ├── Login.tsx        # Authentication page
│   └── Dashboard.tsx    # Main dashboard with charts and tables
├── store/
│   └── themeStore.ts    # Zustand store for dark/light mode
├── types/
│   └── index.ts         # TypeScript interfaces and types
├── theme.ts             # MUI theme configuration (light/dark)
├── index.css            # Global styles and Tailwind config
└── main.tsx             # App entry point
```

## API Integration

The dashboard connects to the iPrescribe staging API:

### Endpoints Used

- **POST** `/auth/login` - User authentication
- **GET** `/admin/dashboard/stats` - Dashboard statistics and chart data
- **GET** `/admin/patients` - Patient records with pagination

### Authentication

- Login credentials are validated against the staging API
- JWT token is stored in `localStorage` upon successful login
- All API requests include `Authorization: Bearer <token>` header
- Logout clears the token and redirects to login page

## Key Functionality

### 1. Authentication

- Email format validation
- Password minimum length (8 characters)
- Token-based session management
- Auto-redirect on logout
- Persistent login state across refreshes

### 2. Dashboard Statistics

Real-time metrics displayed in animated cards:

- Total Patients (with % change since last week)
- Total Doctors (with % change)
- Pending Reviews (with % change)
- Total Consultations (with % change)
- Prescriptions Issued (with % change)

### 3. Charts & Analytics

- **Consultation Over Time** - Line chart tracking consultation trends
- **Prescription Volume Trend** - Line chart showing prescription patterns
- **Active Doctors vs Patients** - Bar chart comparing active users
- **Top Specialties by Demand** - Pie chart visualizing specialty distribution

### 4. Patient Management

- Paginated table with 10 records per page
- Search functionality across all fields
- Sortable columns
- Displays: Name, Diagnosis, Status, Date

### 5. CSV Export

Click the "Export" button to download:

- Dashboard statistics with percentage changes
- Recent patient records
- Timestamped filename: `iprescribe_dashboard_YYYY-MM-DD.csv`
- Auto-download as CSV file

### 6. Dark Mode

- Toggle switch in top bar
- Saves preference to `localStorage`
- Syncs with system preference on first load
- Applies to both MUI and Tailwind components
- Smooth theme transitions

### 7. Collapsible Sidebar

- Hamburger menu button in top bar
- Smooth slide animation
- 11 navigation items:
  - Dashboard
  - Patients
  - Doctors
  - Appointments
  - Prescriptions
  - Reviews
  - Reports
  - Billing
  - Settings
  - Notifications
  - Help & Support

### 8. Profile Dropdown

Click on profile section to access:

- Profile (view/edit profile)
- Settings (app preferences)
- Logout (clears session and redirects)

### 8. Profile Dropdown

Click on profile section to access:

- Profile (view/edit profile)
- Settings (app preferences)
- Logout (clears session and redirects)

## Design System

### Colors

**Light Mode:**

- Primary: `#283C85`
- Background: `#F5F5F5`
- Paper: `#FFFFFF`

**Dark Mode:**

- Primary: `#5A78E7`
- Background: `#121212`
- Paper: `#1E1E1E`

### Sidebar Gradient

Both Login and Sidebar use:

```css
linear-gradient(180deg, #283C85 0%, #0A0E1A 100%)
```

### Typography

- Primary Font: Montserrat (400, 500, 600, 700)
- Headings: Plus Jakarta Sans (600, 700)

## Development Notes

### Theme Management

- Theme mode stored in Zustand store
- Persisted to `localStorage` as `theme-mode`
- Falls back to system preference if no saved value
- HTML `dark` class synced with theme mode for Tailwind

### API Error Handling

- Network errors display user-friendly messages
- 401 errors redirect to login
- Failed requests show error alerts
- Loading states during data fetching

### Performance Optimizations

- TanStack Query for data caching
- Lazy loading with React.lazy (ready for implementation)
- Optimized re-renders with proper dependency arrays
- CSS animations instead of JavaScript for better performance

## Customization

### Update API Endpoint

Edit `.env` file:

```env
VITE_API_BASE_URL=https://your-api-url.com/api/v1
```

### Modify Theme Colors

Edit `src/theme.ts`:

```typescript
colorSchemes: {
  light: {
    palette: {
      primary: {
        main: "#YourColor";
      }
    }
  }
}
```

### Add Navigation Items

Edit `src/components/Sidebar.tsx`:

```typescript
const menuItems = [
  { id: "your-item", label: "Your Label", icon: YourIcon },
  // ... other items
];
```

### Customize Statistics Cards

Modify the mapping in `src/pages/Dashboard.tsx` to adjust displayed metrics.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use

If port 3000 is occupied, update `vite.config.ts`:

```typescript
server: {
  port: 3001, // or any available port
}
```

### API Connection Issues

1. Verify `.env` file exists with correct `VITE_API_BASE_URL`
2. Restart dev server after changing `.env`
3. Check network connectivity
4. Verify API endpoint is accessible

### Dark Mode Not Working

1. Clear browser localStorage
2. Toggle theme switch
3. Check browser console for errors
4. Verify `themeStore.ts` is properly imported

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

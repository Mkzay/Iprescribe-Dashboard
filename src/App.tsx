import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useThemeStore } from "./store/themeStore";
import theme from "./theme";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();
const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { mode } = useThemeStore();

  // Sync Tailwind dark mode with MUI theme
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const currentTheme = {
    ...theme,
    palette: {
      ...theme.colorSchemes[mode].palette,
      mode,
    },
  };

  if (!isLoggedIn) {
    return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          <Login onLogin={() => setIsLoggedIn(true)} />
        </ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={currentTheme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar
              activeItem={activeItem}
              onItemClick={setActiveItem}
              isOpen={sidebarOpen}
            />
            <div
              className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
                sidebarOpen ? "ml-[252px]" : "ml-0"
              }`}
            >
              <TopBar
                onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                sidebarOpen={sidebarOpen}
              />
              <Dashboard />
            </div>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

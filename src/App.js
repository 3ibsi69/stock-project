import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import Topbar from "./pages/global/Topbar";

import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

const App = () => {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const shouldShowSidebarAndTopbar = !["/", "/register"].includes(
    location.pathname
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {shouldShowSidebarAndTopbar ? (
          <MyProSidebarProvider>
            <div style={{ height: "100%", width: "100%" }}>
              <main>
                <Topbar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
          </MyProSidebarProvider>
        ) : (
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              {shouldShowSidebarAndTopbar && <Topbar />}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

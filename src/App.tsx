import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppThemeProvider } from "./theme/ThemeContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { DashboardLayout } from "./components/DashboardLayout";

import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { NotFound } from "./pages/NotFound";

import { Overview } from "./pages/portal/Overview";
import { Courses } from "./pages/portal/Courses";
import { Registration } from "./pages/portal/Registration";
import { Grades } from "./pages/portal/Grades";
import { Schedule } from "./pages/portal/Schedule";
import { Billing } from "./pages/portal/Billing";
import { Polls } from "./pages/portal/Polls";
import { Information } from "./pages/portal/Information";

export default function App() {
  return (
    <AppThemeProvider>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Authenticated portal (sidebar shell) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/app" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="courses" element={<Courses />} />
                <Route path="registration" element={<Registration />} />
                <Route path="grades" element={<Grades />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="billing" element={<Billing />} />
                <Route path="polls" element={<Polls />} />
                <Route path="information" element={<Information />} />
              </Route>
            </Route>

            {/* Legacy path redirects */}
            <Route path="/dashboard" element={<Navigate to="/app" replace />} />
            <Route path="/dash" element={<Navigate to="/app" replace />} />
            <Route path="/profile" element={<Navigate to="/app/information" replace />} />
            <Route path="/transactions" element={<Navigate to="/app/billing" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppThemeProvider>
  );
}

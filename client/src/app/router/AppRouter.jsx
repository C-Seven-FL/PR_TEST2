import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../../shared/components/layout/AppShell";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import { ReservationsPage } from "../../features/reservations/pages/ReservationsPage";
import { ProtectedRoute } from "../../features/auth/components/ProtectedRoute";
import CalendarPage from "../../features/calendar/pages/CalendarPage";
import { ServicesPage } from "../../features/services/pages/ServicesPage";
import { ServiceDetailPage } from "../../features/services/pages/ServiceDetailPage";

import { PublicOnlyRoute } from "../../features/auth/components/PublicOnlyRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route element={<PublicOnlyRoute />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={["client"]} redirectTo="/dashboard" />}
          >
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

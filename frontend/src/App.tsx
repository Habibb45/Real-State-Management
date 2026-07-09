import { Route, Routes } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { PropertiesPage } from "./pages/PropertiesPage";
import { PropertyDetailsPage } from "./pages/PropertyDetailsPage";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { ManagePropertiesPage } from "./pages/admin/ManagePropertiesPage";
import { ManageUsersPage } from "./pages/admin/ManageUsersPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="properties" element={<ManagePropertiesPage />} />
          <Route path="users" element={<ManageUsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

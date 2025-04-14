import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import TollsPage from "./pages/TollsPage";

// Import placeholder pages
const VehiclesPage = () => <div>Vehicle Page</div>;
const PassagesPage = () => <div>Toll Passages Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="passages" element={<PassagesPage />} />
          <Route path="calculate" element={<TollsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

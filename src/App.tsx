import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from '@/components/MainLayout'
import CalculateTollPage from '@/pages/CalculateTollPage'
import TollsPassagesPage from '@/pages/TollsPassagesPage'

// For the Vehicles page I would have added the possibility to store your vehicles (or dynamically fetch the cars registred for you personal number

const VehiclesPage = () => <div>Vehicle Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TollsPassagesPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="calculate" element={<CalculateTollPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

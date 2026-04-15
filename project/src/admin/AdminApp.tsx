import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
import { Login } from './pages/Login';
import { Leads } from './pages/admin/Leads';
import { Categories } from './pages/admin/Categories';
import { Portfolio } from './pages/admin/Portfolio';
import { Testimonials } from './pages/admin/Testimonials';
import { Settings } from './pages/admin/Settings';
import { Invoices } from './pages/admin/Invoices';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="leads" replace />} />
          <Route path="leads" element={<Leads />} />
          <Route path="categories" element={<Categories />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="settings" element={<Settings />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

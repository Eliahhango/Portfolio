import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from '../../contexts/AdminAuthContext';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import Messages from './Messages';
import Newsletter from './Newsletter';
import BlogManager from './BlogManager';
import Visitors from './Visitors';
import Services from './Services';
import SettingsPage from './SettingsPage';

const AdminEntry: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          element={(
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          )}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="visitors" element={<Visitors />} />
          <Route path="services" element={<Services />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminEntry;

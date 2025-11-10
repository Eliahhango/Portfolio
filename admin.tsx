import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './components/admin/AdminApp';

const rootElement = document.getElementById('admin-root');
if (!rootElement) {
  throw new Error("Could not find admin root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);


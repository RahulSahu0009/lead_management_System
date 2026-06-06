import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { LeadProvider } from './context/LeadContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import AddLead from './pages/AddLead.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditLead from './pages/EditLead.jsx';
import LeadDetail from './pages/LeadDetail.jsx';
import Leads from './pages/Leads.jsx';
import ToastContainer from './components/ToastContainer.jsx';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((currentValue) => !currentValue);
  };

  return (
    <div className="page-shell">
      <Sidebar isOpen={isSidebarOpen} />
      <Navbar onMenuClick={toggleSidebar} />
      <main className="app-main fade-in">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/new" element={<AddLead />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/leads/:id/edit" element={<EditLead />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ToastProvider>
      <LeadProvider>
        <Layout />
      </LeadProvider>
    </ToastProvider>
  </BrowserRouter>
);

export default App;
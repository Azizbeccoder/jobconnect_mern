import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import JobsPage from './pages/JobsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useAuth } from './context/AuthContext.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ background: '#060910', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Layout({ children }) {
  const location = useLocation();
  const noDashboard = ['/dashboard', '/profile', '/applications', '/saved'].includes(location.pathname);
  return (
    <>
      {!noDashboard && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
        <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        <Route path="*" element={<div style={{ padding: '80px', textAlign: 'center', color: '#475569', background: '#060910', minHeight: '100vh' }}>404 — page not found</div>} />
      </Routes>
    </Layout>
  );
}


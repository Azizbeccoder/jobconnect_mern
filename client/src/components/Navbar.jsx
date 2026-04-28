import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <nav style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '16px', fontFamily: 'Georgia, serif', letterSpacing: '-0.3px' }}>JobConnect</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{
                textDecoration: 'none', color: location.pathname === '/dashboard' ? '#a5b4fc' : '#94a3b8',
                fontSize: '13px', fontWeight: '500', padding: '6px 12px', borderRadius: '6px',
                background: location.pathname === '/dashboard' ? 'rgba(99,102,241,0.12)' : 'transparent'
              }}>Dashboard</Link>
              <Link to="/jobs" style={{
                textDecoration: 'none', color: location.pathname === '/jobs' ? '#a5b4fc' : '#94a3b8',
                fontSize: '13px', fontWeight: '500', padding: '6px 12px', borderRadius: '6px',
                background: location.pathname === '/jobs' ? 'rgba(99,102,241,0.12)' : 'transparent'
              }}>Jobs</Link>
              <div style={{ width: '1px', height: '20px', background: '#1e293b', margin: '0 4px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '700' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{user.name}</span>
              </div>
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid #334155', color: '#94a3b8',
                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
                transition: 'all 0.2s'
              }}
                onMouseOver={e => { e.target.style.borderColor = '#6366f1'; e.target.style.color = '#a5b4fc'; }}
                onMouseOut={e => { e.target.style.borderColor = '#334155'; e.target.style.color = '#94a3b8'; }}
              >Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', padding: '6px 12px' }}>Log in</Link>
              <Link to="/register" style={{
                textDecoration: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white', fontSize: '13px', fontWeight: '600', padding: '7px 16px', borderRadius: '8px'
              }}>Sign up free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

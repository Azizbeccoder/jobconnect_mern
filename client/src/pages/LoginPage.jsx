import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '22px', fontWeight: '800', color: 'white' }}>J</div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#f1f5f9', fontFamily: 'Georgia, serif' }}>Welcome back</h1>
          <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px' }}>Sign in to your JobConnect account</p>
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px' }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Email address</label>
              <input
                type="email" value={form.email} placeholder="john@example.com" required
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Password</label>
              <input
                type="password" value={form.password} placeholder="Your password" required
                onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#f87171', fontSize: '13px' }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={submitting} style={{
              background: submitting ? '#334155' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white', fontWeight: '600', fontSize: '14px', padding: '12px', borderRadius: '10px',
              border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', marginTop: '4px'
            }}>
              {submitting ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '500' }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}

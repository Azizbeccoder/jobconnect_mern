import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seeker' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '22px', fontWeight: '800', color: 'white' }}>J</div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#f1f5f9', fontFamily: 'Georgia, serif' }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px' }}>Join thousands of job seekers and employers</p>
        </div>

        {/* Card */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px' }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Field label="Full name" value={form.name} onChange={(v) => update('name', v)} placeholder="John Smith" required />
            <Field label="Email address" type="email" value={form.email} onChange={(v) => update('email', v)} placeholder="john@example.com" required />
            <Field label="Password" type="password" value={form.password} onChange={(v) => update('password', v)} placeholder="Min. 8 characters" required />

            {/* Role selector */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>I am a...</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[{ value: 'seeker', label: '🎯 Job Seeker' }, { value: 'employer', label: '🏢 Employer' }].map((r) => (
                  <button key={r.value} type="button" onClick={() => update('role', r.value)} style={{
                    padding: '10px', borderRadius: '8px', border: `1px solid ${form.role === r.value ? '#6366f1' : '#334155'}`,
                    background: form.role === r.value ? 'rgba(99,102,241,0.12)' : 'transparent',
                    color: form.role === r.value ? '#a5b4fc' : '#64748b', fontSize: '13px', fontWeight: '500', cursor: 'pointer'
                  }}>{r.label}</button>
                ))}
              </div>
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
              {submitting ? 'Creating account...' : 'Create account →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569', marginTop: '20px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>{label}</label>
      <input
        type={type} value={value} placeholder={placeholder} required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = '#6366f1'}
        onBlur={e => e.target.style.borderColor = '#334155'}
      />
    </div>
  );
}

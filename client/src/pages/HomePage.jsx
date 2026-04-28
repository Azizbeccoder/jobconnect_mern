import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: 'white' }}>
      {/* Hero */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 60px' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '32px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
            <span style={{ fontSize: '12px', color: '#a5b4fc', fontWeight: '500', letterSpacing: '0.5px' }}>NOW IN BETA — FREE FOR JOB SEEKERS</span>
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', fontFamily: 'Georgia, serif', marginBottom: '20px', background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Find work that<br />truly fits you.
          </h1>
          <p style={{ fontSize: '17px', color: '#64748b', lineHeight: '1.7', marginBottom: '40px' }}>
            JobConnect helps job seekers build polished resumes, discover opportunities, and track every application — all in one place.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/dashboard" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontWeight: '600', padding: '14px 28px', borderRadius: '10px', fontSize: '15px' }}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontWeight: '600', padding: '14px 28px', borderRadius: '10px', fontSize: '15px' }}>
                  Get started free →
                </Link>
                <Link to="/login" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontWeight: '500', padding: '14px 28px', borderRadius: '10px', fontSize: '15px' }}>
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '80px', maxWidth: '600px', margin: '80px auto 0' }}>
          {[
            { num: '2,400+', label: 'Active jobs' },
            { num: '180+', label: 'Companies hiring' },
            { num: '12k+', label: 'Seekers placed' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#a5b4fc', fontFamily: 'Georgia, serif' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px', letterSpacing: '0.3px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '80px' }}>
          {[
            { icon: '📄', title: 'Smart Resume Builder', body: 'Fill in your experience once. Export a clean, recruiter-friendly resume any time.' },
            { icon: '📊', title: 'Application Tracker', body: 'Kanban board so you never lose track. See where each application stands at a glance.' },
            { icon: '🏢', title: 'Employer Dashboard', body: 'Post roles, review applicants, and manage your pipeline with a simple dashboard.' },
          ].map((f) => (
            <div key={f.title} style={{ padding: '28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px', color: '#f1f5f9' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

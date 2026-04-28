import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

function NavItem({ to, icon, label, active }) {
  return (
    <Link to={to} style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '6px 10px', borderRadius: '6px', textDecoration: 'none',
      background: active ? '#f0f0f0' : 'transparent',
      color: active ? '#111' : '#888',
      fontSize: '13px', fontWeight: active ? '500' : '400',
      marginBottom: '1px', transition: 'all 0.1s',
    }}
      onMouseOver={e => { if (!active) e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#333'; }}
      onMouseOut={e => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; }}
    >
      <span style={{ fontSize: '14px', opacity: 0.7 }}>{icon}</span>
      {label}
    </Link>
  );
}

function Stat({ label, value, delta }) {
  return (
    <div style={{ padding: '20px 24px', borderRight: '1px solid #f0f0f0', flex: 1 }}>
      <div style={{ fontSize: '11px', color: '#999', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: '600', color: '#111', letterSpacing: '-1px' }}>{value}</div>
    </div>
  );
}

function ActionCard({ icon, title, desc, to }) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '16px', border: '1px solid #efefef', borderRadius: '10px',
        cursor: 'pointer', transition: 'all 0.15s', background: 'white',
      }}
        onMouseOver={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
        onMouseOut={e => { e.currentTarget.style.borderColor = '#efefef'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#111', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#999', lineHeight: '1.5' }}>{desc}</div>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isEmployer = user?.role === 'employer';

  async function handleLogout() { await logout(); navigate('/'); }

  const completion = [user?.name, user?.headline, user?.location, user?.skills?.length > 0]
    .filter(Boolean).length * 25;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#fafafa', fontFamily: "'Inter', 'Segoe UI', sans-serif", overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>

      {/* Sidebar */}
      <aside style={{ width: '220px', minWidth: '220px', background: 'white', borderRight: '1px solid #efefef', display: 'flex', flexDirection: 'column', height: '100vh' }}>

        {/* Logo */}
        <div style={{ padding: '18px 16px', borderBottom: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', background: '#111', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '700' }}>J</div>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>JobConnect</span>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          <div style={{ fontSize: '10px', fontWeight: '600', color: '#ccc', letterSpacing: '0.8px', textTransform: 'uppercase', padding: '0 10px', marginBottom: '4px' }}>Workspace</div>
          <NavItem to="/dashboard" icon="⊞" label="Dashboard" active />
          <NavItem to="/jobs" icon="🔍" label="Browse Jobs" />
          <NavItem to="/profile" icon="👤" label="Profile" />
          <div style={{ height: '1px', background: '#f5f5f5', margin: '10px 0' }} />
          <div style={{ fontSize: '10px', fontWeight: '600', color: '#ccc', letterSpacing: '0.8px', textTransform: 'uppercase', padding: '0 10px', marginBottom: '4px' }}>My Work</div>
          <NavItem to="/applications" icon="📋" label="Applications" />
          <NavItem to="/saved" icon="★" label="Saved Jobs" />
          {isEmployer && (<>
            <div style={{ height: '1px', background: '#f5f5f5', margin: '10px 0' }} />
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#ccc', letterSpacing: '0.8px', textTransform: 'uppercase', padding: '0 10px', marginBottom: '4px' }}>Employer</div>
            <NavItem to="/jobs/new" icon="+" label="Post a Job" />
            <NavItem to="/applicants" icon="👥" label="Applicants" />
          </>)}
        </nav>

        {/* User */}
        <div style={{ padding: '12px', borderTop: '1px solid #f5f5f5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px' }}
            onMouseOver={e => e.currentTarget.style.background = '#f7f7f7'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: '600', flexShrink: 0 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: '11px', color: '#999' }}>{isEmployer ? 'Employer' : 'Job Seeker'}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: '1px solid #efefef', color: '#999', padding: '6px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', transition: 'all 0.1s' }}
            onMouseOver={e => { e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#333'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#999'; }}
          >Sign out</button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '14px 32px', borderBottom: '1px solid #efefef', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#ccc' }}>JobConnect</span>
            <span style={{ fontSize: '12px', color: '#ddd' }}>/</span>
            <span style={{ fontSize: '12px', color: '#111', fontWeight: '500' }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to="/jobs" style={{ textDecoration: 'none', background: '#111', color: 'white', padding: '7px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '500' }}>
              Browse Jobs
            </Link>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>

          {/* Hero section */}
          <div style={{ padding: '40px 32px 0', borderBottom: '1px solid #efefef', background: 'white' }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111', letterSpacing: '-0.5px', margin: '0 0 4px' }}>
                Good morning, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Stats bar */}
            <div style={{ display: 'flex', border: '1px solid #efefef', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
              {isEmployer ? (<>
                <Stat label="Jobs Posted" value="0" />
                <Stat label="Total Applicants" value="0" />
                <Stat label="Positions Filled" value="0" />
                <div style={{ padding: '20px 24px', flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#999', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Profile Views</div>
                  <div style={{ fontSize: '28px', fontWeight: '600', color: '#111', letterSpacing: '-1px' }}>0</div>
                </div>
              </>) : (<>
                <Stat label="Applied" value="0" />
                <Stat label="In Review" value="0" />
                <Stat label="Interviews" value="0" />
                <div style={{ padding: '20px 24px', flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#999', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Saved Jobs</div>
                  <div style={{ fontSize: '28px', fontWeight: '600', color: '#111', letterSpacing: '-1px' }}>0</div>
                </div>
              </>)}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>

            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Actions */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#bbb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>Quick Actions</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {isEmployer ? (<>
                    <ActionCard icon="+" title="Post a New Job" desc="Create a listing and receive applicants." to="/jobs/new" />
                    <ActionCard icon="👥" title="View Applicants" desc="Review candidates for your roles." to="/applicants" />
                    <ActionCard icon="📊" title="Analytics" desc="Track views and conversion rates." to="/analytics" />
                    <ActionCard icon="⚙️" title="Company Profile" desc="Update your company info." to="/profile" />
                  </>) : (<>
                    <ActionCard icon="🔍" title="Browse Jobs" desc="Discover new opportunities." to="/jobs" />
                    <ActionCard icon="📄" title="Edit Profile" desc="Keep your resume up to date." to="/profile" />
                    <ActionCard icon="📋" title="My Applications" desc="Track all your applications." to="/applications" />
                    <ActionCard icon="★" title="Saved Jobs" desc="View bookmarked jobs." to="/saved" />
                  </>)}
                </div>
              </div>

              {/* Activity */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#bbb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>Recent Activity</div>
                <div style={{ border: '1px solid #efefef', borderRadius: '10px', padding: '48px 24px', textAlign: 'center', background: 'white' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚀</div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>No activity yet</div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '18px' }}>
                    {isEmployer ? 'Post your first job to get started.' : 'Start browsing and applying to jobs.'}
                  </div>
                  <Link to={isEmployer ? '/jobs/new' : '/jobs'} style={{ textDecoration: 'none', display: 'inline-block', background: '#111', color: 'white', padding: '8px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: '500' }}>
                    {isEmployer ? 'Post a Job' : 'Browse Jobs'} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Profile card */}
              <div style={{ background: 'white', border: '1px solid #efefef', borderRadius: '10px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f5f5f5' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontWeight: '600' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>{user?.name}</div>
                    <div style={{ fontSize: '11px', color: '#999', marginTop: '1px' }}>{user?.email}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#999' }}>Profile strength</span>
                    <span style={{ fontSize: '11px', color: '#111', fontWeight: '600' }}>{completion}%</span>
                  </div>
                  <div style={{ background: '#f5f5f5', borderRadius: '100px', height: '3px' }}>
                    <div style={{ background: '#111', height: '3px', borderRadius: '100px', width: `${completion}%`, transition: 'width 0.4s' }} />
                  </div>
                </div>

                {[
                  { label: 'Name', done: !!user?.name },
                  { label: 'Headline', done: !!user?.headline },
                  { label: 'Location', done: !!user?.location },
                  { label: 'Skills', done: user?.skills?.length > 0 },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
                    <span style={{ fontSize: '12px', color: '#999' }}>{item.label}</span>
                    <span style={{ fontSize: '11px', color: item.done ? '#22c55e' : '#ddd', fontWeight: '500' }}>{item.done ? '✓' : '○'}</span>
                  </div>
                ))}

                <Link to="/profile" style={{ display: 'block', marginTop: '14px', textDecoration: 'none', textAlign: 'center', background: '#f7f7f7', border: '1px solid #efefef', color: '#555', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: '500' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f0f0f0'}
                  onMouseOut={e => e.currentTarget.style.background = '#f7f7f7'}
                >
                  Edit Profile →
                </Link>
              </div>

              {/* Tips */}
              <div style={{ background: '#f9f9f9', border: '1px solid #efefef', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#bbb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>Tips</div>
                {(isEmployer
                  ? ['Write clear job descriptions', 'Respond to applicants within 48h', 'Add your company logo']
                  : ['Complete your profile to stand out', 'Add relevant skills', 'Apply within 24h of posting', 'Tailor your cover letter']
                ).map(tip => (
                  <div key={tip} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ccc', marginTop: '7px', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#888', lineHeight: '1.6' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

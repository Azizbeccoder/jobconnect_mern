import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/client.js';

const SKILL_SUGGESTIONS = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'TypeScript', 'MongoDB', 'HTML/CSS', 'Java', 'C++', 'AWS', 'Docker', 'Figma', 'Excel'];

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    location: user?.location || '',
    skills: user?.skills || [],
    avatarUrl: user?.avatarUrl || '',
    education: user?.education || '',
    bio: user?.bio || '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  function update(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function addSkill(skill) {
    const s = skill.trim();
    if (s && !form.skills.includes(s)) {
      update('skills', [...form.skills, s]);
    }
    setSkillInput('');
  }

  function removeSkill(skill) {
    update('skills', form.skills.filter(s => s !== skill));
  }

  async function saveProfile() {
    setSaving(true);
    setError('');
    try {
      await api.patch('/api/users/me', {
        name: form.name,
        headline: form.headline,
        location: form.location,
        skills: form.skills,
        avatarUrl: form.avatarUrl,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  const tabs = ['profile', 'resume'];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#f1f5f9', fontWeight: '800', fontSize: '24px', fontFamily: 'Georgia, serif', margin: '0 0 6px' }}>Profile & Resume</h1>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>Build your professional profile to stand out to employers</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? 'rgba(99,102,241,0.2)' : 'transparent',
              color: activeTab === tab ? '#a5b4fc' : '#64748b',
              border: activeTab === tab ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
              padding: '7px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', textTransform: 'capitalize'
            }}>{tab === 'profile' ? '👤 Profile' : '📄 Resume Preview'}</button>
          ))}
        </div>

        {activeTab === 'profile' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px' }}>
            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Avatar & name */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>Basic Info</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
                    {form.name?.charAt(0).toUpperCase()}
                  </div>
                  <Field label="Full Name" value={form.name} onChange={v => update('name', v)} />
                </div>
                <Field label="Professional Headline" value={form.headline} onChange={v => update('headline', v)} placeholder="e.g. Computer Science Student | React Developer" />
                <div style={{ marginTop: '12px' }}>
                  <Field label="Location" value={form.location} onChange={v => update('location', v)} placeholder="e.g. Seoul, South Korea" />
                </div>
              </div>

              {/* Skills */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>Skills</h2>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <input
                    value={skillInput} onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)}
                    placeholder="Add a skill..."
                    style={{ flex: 1, background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#f1f5f9', fontSize: '13px', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#334155'}
                  />
                  <button onClick={() => addSkill(skillInput)} style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Add</button>
                </div>

                {/* Suggestions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).slice(0, 8).map(s => (
                    <button key={s} onClick={() => addSkill(s)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #334155', color: '#64748b', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>+ {s}</button>
                  ))}
                </div>

                {/* Current skills */}
                {form.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {form.skills.map(s => (
                      <span key={s} style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {s}
                        <button onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '14px', padding: 0, lineHeight: 1 }}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Education */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>Education</h2>
                <textarea
                  value={form.education} onChange={e => update('education', e.target.value)}
                  placeholder="e.g. B.S. Computer Science, Seoul National University, 2022–2026"
                  rows={3}
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              {error && <p style={{ color: '#f87171', fontSize: '13px' }}>⚠️ {error}</p>}

              <button onClick={saveProfile} disabled={saving} style={{
                background: saved ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: saved ? '#10b981' : 'white', border: saved ? '1px solid rgba(16,185,129,0.3)' : 'none',
                padding: '12px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
              }}>
                {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>

            {/* Sidebar tips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '16px' }}>
                <h3 style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Profile Strength</h3>
                {[
                  { label: 'Name', done: !!form.name },
                  { label: 'Headline', done: !!form.headline },
                  { label: 'Location', done: !!form.location },
                  { label: 'Skills (3+)', done: form.skills.length >= 3 },
                  { label: 'Education', done: !!form.education },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', color: item.done ? '#10b981' : '#334155' }}>{item.done ? '✓' : '○'}</span>
                  </div>
                ))}
                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#475569' }}>Completion</span>
                    <span style={{ fontSize: '11px', color: '#a5b4fc' }}>
                      {Math.round(([form.name, form.headline, form.location, form.skills.length >= 3, form.education].filter(Boolean).length / 5) * 100)}%
                    </span>
                  </div>
                  <div style={{ background: '#1e293b', borderRadius: '100px', height: '4px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', height: '4px', borderRadius: '100px', width: `${Math.round(([form.name, form.headline, form.location, form.skills.length >= 3, form.education].filter(Boolean).length / 5) * 100)}%`, transition: 'width 0.3s' }} />
                  </div>
                </div>
              </div>

              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
                <h3 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Student Tips</h3>
                {[
                  'Add skills from your coursework',
                  'Include internships and projects',
                  'Mention your graduation year',
                  'List any certifications',
                ].map(tip => (
                  <p key={tip} style={{ fontSize: '12px', color: '#475569', margin: '0 0 8px', paddingLeft: '10px', borderLeft: '2px solid rgba(99,102,241,0.3)', lineHeight: '1.5' }}>{tip}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Resume Preview */
          <div style={{ background: 'white', borderRadius: '12px', padding: '48px', maxWidth: '680px', margin: '0 auto', color: '#1e293b' }}>
            <div style={{ borderBottom: '3px solid #6366f1', paddingBottom: '20px', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>{form.name || 'Your Name'}</h1>
              <p style={{ fontSize: '15px', color: '#6366f1', fontWeight: '500', margin: '0 0 8px' }}>{form.headline || 'Your Headline'}</p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b' }}>
                {form.location && <span>📍 {form.location}</span>}
                <span>✉️ {user?.email}</span>
              </div>
            </div>

            {form.education && (
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>Education</h2>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: 0 }}>{form.education}</p>
              </div>
            )}

            {form.skills.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>Skills</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {form.skills.map(s => (
                    <span key={s} style={{ background: '#f1f5f9', color: '#334155', padding: '4px 12px', borderRadius: '6px', fontSize: '13px' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <button onClick={() => window.print()} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                🖨️ Print / Save as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={{ width: '100%' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#64748b', marginBottom: '6px' }}>{label}</label>
      <input
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#f1f5f9', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = '#6366f1'}
        onBlur={e => e.target.style.borderColor = '#334155'}
      />
    </div>
  );
}

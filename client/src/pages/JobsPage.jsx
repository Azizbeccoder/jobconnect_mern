import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

const TYPES = ['all', 'full-time', 'part-time', 'internship', 'remote', 'contract'];
const LEVELS = ['all', 'entry', 'mid', 'senior'];

function JobCard({ job, onApply, applied }) {
  const typeColors = {
    'full-time': '#10b981', 'part-time': '#6366f1', 'internship': '#f59e0b',
    'remote': '#8b5cf6', 'contract': '#ef4444',
  };
  const levelColors = { entry: '#6366f1', mid: '#f59e0b', senior: '#10b981' };

  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', transition: 'border-color 0.2s', cursor: 'pointer' }}
      onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
      onMouseOut={e => e.currentTarget.style.borderColor = '#334155'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h3 style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '15px', margin: '0 0 4px' }}>{job.title}</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>{job.company} · {job.location}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
          <span style={{ background: typeColors[job.type] + '20', color: typeColors[job.type], fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '100px' }}>{job.type}</span>
          <span style={{ background: levelColors[job.level] + '20', color: levelColors[job.level], fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '100px' }}>{job.level}</span>
        </div>
      </div>

      {job.salary && (
        <p style={{ color: '#10b981', fontSize: '13px', fontWeight: '600', margin: '0 0 10px' }}>{job.salary}</p>
      )}

      <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>

      {job.skills?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {job.skills.slice(0, 4).map(skill => (
            <span key={skill} style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', fontSize: '11px', padding: '3px 8px', borderRadius: '6px' }}>{skill}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#475569', fontSize: '11px' }}>{new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <button
          onClick={() => onApply(job)}
          disabled={applied}
          style={{
            background: applied ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: applied ? '#10b981' : 'white',
            border: applied ? '1px solid rgba(16,185,129,0.3)' : 'none',
            padding: '7px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
            cursor: applied ? 'default' : 'pointer',
          }}
        >
          {applied ? '✓ Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [level, setLevel] = useState('all');
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [applyModal, setApplyModal] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
    if (user?.role === 'seeker') fetchMyApplications();
  }, [search, type, level]);

  async function fetchJobs() {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (type !== 'all') params.type = type;
      if (level !== 'all') params.level = level;
      const { data } = await api.get('/api/jobs', { params });
      setJobs(data.jobs);
    } catch { setJobs([]); } finally { setLoading(false); }
  }

  async function fetchMyApplications() {
    try {
      const { data } = await api.get('/api/jobs/my-applications');
      setAppliedIds(new Set(data.applications.map(a => a.job._id)));
    } catch {}
  }

  async function submitApplication() {
    if (!user) { navigate('/login'); return; }
    setApplying(true);
    setError('');
    try {
      await api.post(`/api/jobs/${applyModal._id}/apply`, { coverLetter });
      setAppliedIds(prev => new Set([...prev, applyModal._id]));
      setApplyModal(null);
      setCoverLetter('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to apply');
    } finally { setApplying(false); }
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#f1f5f9', fontWeight: '800', fontSize: '24px', fontFamily: 'Georgia, serif', margin: '0 0 6px' }}>Browse Jobs</h1>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>Find opportunities that match your skills and career goals</p>
        </div>

        {/* Search & Filters */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search jobs, companies, skills..."
            style={{ flex: '1', minWidth: '200px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '9px 14px', color: '#f1f5f9', fontSize: '13px', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = '#334155'}
          />
          <select value={type} onChange={e => setType(e.target.value)} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '9px 14px', color: '#f1f5f9', fontSize: '13px', outline: 'none' }}>
            {TYPES.map(t => <option key={t} value={t}>{t === 'all' ? 'All types' : t}</option>)}
          </select>
          <select value={level} onChange={e => setLevel(e.target.value)} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '9px 14px', color: '#f1f5f9', fontSize: '13px', outline: 'none' }}>
            {LEVELS.map(l => <option key={l} value={l}>{l === 'all' ? 'All levels' : l}</option>)}
          </select>
        </div>

        {/* Results count */}
        <p style={{ color: '#475569', fontSize: '13px', marginBottom: '16px' }}>
          {loading ? 'Loading...' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`}
        </p>

        {/* Job grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
            <p style={{ color: '#475569', fontSize: '14px' }}>No jobs found. Try different filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: '14px' }}>
            {jobs.map(job => (
              <JobCard key={job._id} job={job} onApply={setApplyModal} applied={appliedIds.has(job._id)} />
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {applyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '480px' }}>
            <h2 style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '18px', margin: '0 0 4px' }}>Apply for {applyModal.title}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px' }}>{applyModal.company} · {applyModal.location}</p>

            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Cover Letter (optional)</label>
            <textarea
              value={coverLetter} onChange={e => setCoverLetter(e.target.value)}
              placeholder="Tell the employer why you're a great fit..."
              rows={5}
              style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />

            {error && <p style={{ color: '#f87171', fontSize: '13px', marginTop: '8px' }}>⚠️ {error}</p>}

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setApplyModal(null)} style={{ flex: 1, background: 'transparent', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
              <button onClick={submitApplication} disabled={applying} style={{ flex: 2, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                {applying ? 'Submitting...' : 'Submit Application →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

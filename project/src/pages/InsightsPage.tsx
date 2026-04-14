import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, AlertTriangle, RefreshCw, Loader2, Sparkles } from 'lucide-react';


import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, any> = {
  'trending-up': TrendingUp,
  'dollar-sign': DollarSign,
  'calendar': Calendar,
  'alert-triangle': AlertTriangle,
};

const badgeStyles: Record<string, { bg: string; color: string }> = {
  green: { bg: '#f0fdf4', color: '#16a34a' },
  blue: { bg: '#eff6ff', color: '#2563eb' },
  yellow: { bg: '#fffbeb', color: '#d97706' },
  red: { bg: '#fef2f2', color: '#dc2626' },
};

const iconBgStyles: Record<string, { bg: string; color: string }> = {
  positive: { bg: '#f0fdf4', color: '#22c55e' },
  warning: { bg: '#fef2f2', color: '#ef4444' },
};

const valueColors: Record<string, string> = {
  green: '#22c55e',
  blue: '#3b82f6',
  yellow: '#f59e0b',
  red: '#ef4444',
};

interface Insight {
  id: any;
  type: string;
  icon: string;
  value: any;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
}

export default function InsightsPage() {
  const navigate = useNavigate();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      // First, check if there's already an analysis from an upload
      const currentRes = await fetch('http://localhost:8000/current-data');
      if (!currentRes.ok) throw new Error('Backend unreachable');
      const currentData = await currentRes.json();
      
      if (currentData.insights && currentData.insights.length > 0) {
        setInsights(currentData.insights);
        setAiAdvice(currentData.aiAdvice || []);
        setLoading(false);
        return;
      }

      // NO mock generation. If no data, we stay idle or show empty state.
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to the analytics server. Make sure the FastAPI server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 4 }}>
            AI Insights
          </h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>Deep data analysis powered by our advanced analytics engine.</p>
        </div>
        {!loading && insights.length > 0 && (
          <button
            onClick={fetchInsights}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: 14,
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => !loading && ((e.currentTarget as HTMLElement).style.background = '#2563eb')}
            onMouseLeave={(e) => !loading && ((e.currentTarget as HTMLElement).style.background = '#3b82f6')}
          >
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1.5s linear infinite' }} /> : <RefreshCw size={18} />}
            {loading ? 'Analyzing...' : 'Regenerate Insights'}
          </button>
        )}
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: 16, borderRadius: 12, marginBottom: 24, fontSize: 14, fontWeight: 500 }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', position: 'relative', marginBottom: 20 }}>
             <Loader2 size={48} color="#3b82f6" style={{ animation: 'spin 1.5s linear infinite' }} />
             <Sparkles size={18} color="#f59e0b" style={{ position: 'absolute', top: -5, right: -5, animation: 'pulse 2s ease-in-out infinite' }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>AI is analyzing your data...</h2>
          <p style={{ fontSize: 14, color: '#64748b' }}>Curating specialized insights using deep learning models.</p>
        </div>
      )}

      {/* Stats row */}
      {!loading && insights.length > 0 && (
      <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Insights', value: insights.length || '0', color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Opportunities', value: insights.filter(i => i.type === 'positive').length || '0', color: '#22c55e', bg: '#f0fdf4' },
          { label: 'Anomalies', value: insights.filter(i => i.type === 'warning').length || '0', color: '#ef4444', bg: '#fef2f2' },
          { label: 'High Impact', value: insights.filter(i => i.badge === 'HIGH IMPACT').length || '0', color: '#f59e0b', bg: '#fffbeb' },
        ].map(({ label, value, color, bg }) => (
          <div
            key={label}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '16px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              minWidth: 160
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                background: bg,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 800,
                color,
              }}
            >
              {value}
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>{label}</p>
          </div>
        ))}
      </div>
      )}

      {/* Insight cards grid */}
      {!loading && insights.length > 0 && (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 20,
        }}
      >
        {insights.map((insight) => {
          const Icon = iconMap[insight.icon] || TrendingUp;
          const iconStyle = iconBgStyles[insight.type] || iconBgStyles.positive;
          const badge = badgeStyles[insight.badgeColor] || badgeStyles.blue;
          const valColor = valueColors[insight.badgeColor] || '#3b82f6';

          return (
            <div
              key={insight.id}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: 24,
                transition: 'box-shadow 0.2s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
                (e.currentTarget as HTMLElement).style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: iconStyle.bg,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={18} color={iconStyle.color} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: valColor, letterSpacing: '-0.5px' }}>
                    {insight.value}
                  </span>
                  <span
                    style={{
                      background: badge.bg,
                      color: badge.color,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.8px',
                      padding: '3px 8px',
                      borderRadius: 6,
                    }}
                  >
                    {insight.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                {insight.title}
              </h3>
              <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6 }}>
                {insight.description}
              </p>
              
              <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.8; } }
              `}</style>
            </div>
          );
        })}
      </div>
      )}

      {/* AI Advice Section */}
      {!loading && aiAdvice.length > 0 && (
        <div 
          style={{ 
            marginTop: 40,
            background: '#0f172a', 
            borderRadius: 20, 
            padding: 32,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative element */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, position: 'relative' }}>
            <div style={{ background: '#3b82f6', p: 8, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>AI Strategic Advisory</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, position: 'relative' }}>
            {aiAdvice.map((advice, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'rgba(30, 41, 59, 0.5)', 
                  border: '1px solid rgba(51, 65, 85, 0.5)', 
                  borderRadius: 14, 
                  padding: 24,
                  display: 'flex',
                  gap: 16
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, color: '#3b82f6', opacity: 0.5 }}>0{idx + 1}</div>
                <p style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.6, fontWeight: 500 }}>{advice}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!loading && insights.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '100px 0', background: '#f8fafc', borderRadius: 20, border: '1px dashed #e2e8f0' }}>
          <div style={{ background: '#eff6ff', width: 64, height: 64, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
             <Sparkles size={32} color="#3b82f6" />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Insights Are Locked</h2>
          <p style={{ fontSize: 15, color: '#64748b', maxWidth: 420, margin: '0 auto 28px' }}>
            Our AI engine needs data to perform its analysis. Upload a dataset to unlock actionable strategic insights.
          </p>
          <button 
            onClick={() => navigate('/upload')} 
            style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
          >
            Go to Upload
          </button>
        </div>
      )}
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, BarChart2, Zap, TrendingUp, Target } from 'lucide-react';

const features = [
  {
    icon: Zap,
    color: '#3b82f6',
    bg: '#eff6ff',
    title: 'Automated Data Cleaning',
    desc: 'Intelligent preprocessing removes duplicates, fills missing values, and normalizes formats automatically.',
  },
  {
    icon: BarChart2,
    color: '#8b5cf6',
    bg: '#f5f3ff',
    title: 'Interactive Analytics Dashboard',
    desc: 'Real-time charts and KPIs that update instantly when new data is uploaded.',
  },
  {
    icon: Target,
    color: '#f59e0b',
    bg: '#fffbeb',
    title: 'KPI Monitoring',
    desc: 'Track revenue, profit margin, order volume, and growth trends in one unified view.',
  },
  {
    icon: TrendingUp,
    color: '#22c55e',
    bg: '#f0fdf4',
    title: 'Business Intelligence Reports',
    desc: 'AI-generated insights surface hidden opportunities and flag profitability risks.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Navbar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 40px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: '#3b82f6',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BarChart2 size={20} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>DataFramework</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#2563eb')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#3b82f6')}
        >
          Open Dashboard
        </button>
      </header>

      {/* Hero */}
      <section
        style={{
          padding: '100px 40px 80px',
          textAlign: 'center',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 999,
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 500,
            color: '#3b82f6',
            marginBottom: 32,
          }}
        >
          <Sparkles size={13} />
          E-Commerce Analytics Framework
        </div>

        <h1
          style={{
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            maxWidth: 720,
            margin: '0 auto 24px',
          }}
        >
          Turn transaction logs into growth levers.
        </h1>
        <p
          style={{
            fontSize: 18,
            color: '#64748b',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          Most businesses are data-rich but insight-poor. DataFramework converts raw e-commerce data
          into actionable intelligence — automatically.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#2563eb')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#3b82f6')}
          >
            Open Dashboard <ArrowRight size={16} />
          </button>
          <button
            style={{
              background: '#fff',
              color: '#0f172a',
              border: '1.5px solid #e2e8f0',
              borderRadius: 8,
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#94a3b8')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0')}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Problem */}
      <section style={{ padding: '80px 40px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>
            THE PROBLEM
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 16 }}>
            Businesses have data. They lack direction.
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.75, maxWidth: 640 }}>
            E-commerce platforms generate thousands of transactions daily, but most SMEs and startups
            don't have the tools or expertise to extract meaning from that data. Critical insights about
            profitability leaks, regional performance, and seasonal trends remain locked in spreadsheets.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section style={{ padding: '80px 40px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>
            THE SOLUTION
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 16 }}>
            Automated analytics, zero overhead.
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.75, maxWidth: 640, marginBottom: 48 }}>
            DataFramework automates the entire analytics pipeline — from data ingestion and cleaning to
            visualization and insight generation. Upload a CSV and receive cleaned datasets, interactive
            dashboards, KPI monitoring, and AI-powered recommendations within seconds.
          </p>

          {/* Features grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <div
                key={title}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 14,
                  padding: 24,
                  transition: 'box-shadow 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: bg,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Icon size={20} color={color} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 40px', background: '#0f172a', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 16 }}>
          Ready to unlock your data's potential?
        </h2>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 36 }}>
          Start exploring your e-commerce insights in minutes — no setup required.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 28px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#2563eb')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#3b82f6')}
        >
          Open Dashboard <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px 40px', background: '#0f172a', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: '#3b82f6', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart2 size={15} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>DataFramework</span>
        </div>
        <span style={{ fontSize: 13, color: '#475569' }}>Data-Driven E-Commerce Analytics Framework • 2024</span>
      </footer>
    </div>
  );
}

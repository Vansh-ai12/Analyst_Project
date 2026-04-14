import { Code2, BarChart2, Database, Globe, Users, Briefcase, BookOpen } from 'lucide-react';

const techStack = [
  { icon: Code2, label: 'Python', desc: 'Pandas, NumPy for data processing', color: '#3b76c3', bg: '#eff6ff' },
  { icon: BarChart2, label: 'Chart.js', desc: 'Interactive data visualizations', color: '#3b82f6', bg: '#eff6ff' },
  { icon: Database, label: 'React + TypeScript', desc: 'Component-based frontend architecture', color: '#06b6d4', bg: '#ecfeff' },
  { icon: Globe, label: 'Tailwind CSS', desc: 'Utility-first responsive styling', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: BookOpen, label: 'FastAPI / Flask', desc: 'Backend REST API for analytics engine', color: '#22c55e', bg: '#f0fdf4' },
  { icon: Database, label: 'SQLite / PostgreSQL', desc: 'Structured data storage', color: '#f59e0b', bg: '#fffbeb' },
];

const targetUsers = [
  { icon: Briefcase, label: 'SMEs', desc: 'Small and medium businesses looking to understand their sales performance.' },
  { icon: Users, label: 'Startups', desc: 'Early-stage startups that need fast, automated analytics without a data team.' },
  { icon: Globe, label: 'Marketing Teams', desc: 'Teams that need campaign performance data and regional breakdown insights.' },
];

export default function AboutPage() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 4 }}>
          About DataFramework
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', maxWidth: 600 }}>
          A data-driven e-commerce analytics framework that transforms raw transaction data into actionable business intelligence.
        </p>
      </div>

      {/* Problem */}
      <section style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
          THE PROBLEM
        </p>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 14,
            padding: 28,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Data Rich, Insight Poor</h3>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75 }}>
            Small and medium businesses generate thousands of transactions daily across multiple channels. Yet most lack the
            tools, time, or expertise to convert this data into meaningful insights. Revenue leaks, seasonal trends, and
            growth opportunities remain hidden in spreadsheets.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
          THE SOLUTION
        </p>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 14,
            padding: 28,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Automated Analytics Framework</h3>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75 }}>
            DataFramework automates the entire analytics pipeline — from data ingestion and cleaning to visualization and
            insight generation. Upload a CSV, and the system delivers cleaned datasets, interactive dashboards, KPI
            monitoring, and AI-powered recommendations within seconds.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
          TECHNOLOGY STACK
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {techStack.map(({ icon: Icon, label, desc, color, bg }) => (
            <div
              key={label}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'box-shadow 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
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
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color={color} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Users */}
      <section>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
          TARGET USERS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {targetUsers.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: 24,
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: '#eff6ff',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}
              >
                <Icon size={18} color="#3b82f6" />
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{label}</h4>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Upload, BarChart2, Lightbulb, Info } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: 'Data Upload', icon: Upload },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
  { path: '/about', label: 'About', icon: Info },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: 260,
        minHeight: '100vh',
        background: '#fff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
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
        <span style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', letterSpacing: '-0.3px' }}>
          DataFramework
        </span>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive =
            path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                marginBottom: 2,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#3b82f6' : '#64748b',
                background: isActive ? '#eff6ff' : 'transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = '#f8fafc';
                  (e.currentTarget as HTMLElement).style.color = '#0f172a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#64748b';
                }
              }}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      {/* Demo mode badge */}
      <div
        style={{
          margin: 16,
          padding: '12px 14px',
          background: '#f8fafc',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>Demo Mode</p>
        <p style={{ fontSize: 12, color: '#94a3b8' }}>Using mock data for demonstration</p>
      </div>
    </aside>
  );
}

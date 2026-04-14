import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, BarChart2, Package } from 'lucide-react';
import { recentTransactions } from '../data/mockData';

import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend, Title);

function KpiCard({
  title, value, change, icon: Icon, iconColor, iconBg, prefix = '', suffix = '',
}: {
  title: string; value: string | number; change: number; icon: any;
  iconColor: string; iconBg: string; prefix?: string; suffix?: string;
}) {
  const positive = change >= 0;
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: '20px 24px',
        flex: 1,
        minWidth: 180,
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {title}
        </p>
        <div style={{ padding: 8, background: iconBg, borderRadius: 10 }}>
          <Icon size={16} color={iconColor} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
          {prefix}{typeof value === 'number' && title.includes('MARGIN') ? `${value}%` : typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
        {positive
          ? <TrendingUp size={14} color="#22c55e" />
          : <TrendingDown size={14} color="#ef4444" />}
        <span style={{ fontSize: 13, fontWeight: 600, color: positive ? '#22c55e' : '#ef4444' }}>
          {positive ? '+' : ''}{change}%
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>vs last period</span>
      </div>
    </div>
  );
}

const statusColors: Record<string, { bg: string; color: string }> = {
  completed: { bg: '#f0fdf4', color: '#16a34a' },
  processing: { bg: '#fffbeb', color: '#d97706' },
  refunded: { bg: '#fef2f2', color: '#dc2626' },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/current-data')
      .then(res => res.json())
      .then(json => {
        if (json.kpiData) setData(json);
      })
      .catch(err => console.error("No server data yet", err));
  }, []);

  if (!data) {
    return (
      <div style={{ padding: 32, textAlign: 'center', marginTop: 80 }}>
        <div style={{ background: '#eff6ff', width: 80, height: 80, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <BarChart2 size={40} color="#3b82f6" />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Executive View Locked</h2>
        <p style={{ fontSize: 16, color: '#64748b', maxWidth: 400, margin: '0 auto 32px' }}>
          Please upload and process your dataset to unlock real-time revenue trends and AI strategic insights.
        </p>
        <button 
          onClick={() => navigate('/upload')} 
          style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 600, cursor: 'pointer' }}
        >
          Go to Upload
        </button>
      </div>
    );
  }

  const kpis = data.kpiData;
  const rev = data.monthlyRevenue;
  const reg = data.salesByRegion;
  const prod = data.topProducts;
  const recentTx = data.recentTransactions || recentTransactions; // fallback for transactions if not in AI output yet

  // Monthly Revenue chart
  const revenueChartData = {
    labels: rev.labels,
    datasets: [
      {
        label: 'Revenue',
        data: rev.data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.08)',
        fill: true,
        tension: 0.45,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2.5,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index' as const, intersect: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 }, color: '#94a3b8' } },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: {
          font: { size: 12 },
          color: '#94a3b8',
          callback: (v: any) => `$${(v / 1000).toFixed(0)}k`,
        },
      },
    },
  };

  // Donut chart
  const donutData = {
    labels: reg.labels,
    datasets: [
      {
        data: reg.data,
        backgroundColor: reg.colors || ['#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#14b8a6'],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { font: { size: 12 }, color: '#374151', padding: 14, boxWidth: 12, boxHeight: 12, usePointStyle: true, pointStyle: 'circle' },
      },
    },
  };

  // Seasonal bar chart
  const sea = data.seasonalGrowth || { labels: [], data: [] };
  const seasonalData = {
    labels: sea.labels,
    datasets: [
      {
        label: 'Revenue Growth %',
        data: sea.data,
        backgroundColor: '#3b82f6',
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const seasonalOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 }, color: '#94a3b8' } },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { font: { size: 12 }, color: '#94a3b8' },
      },
    },
  };

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 4 }}>
          Executive Summary
        </h1>
        <p style={{ fontSize: 14, color: '#64748b' }}>Real-time performance across all channels.</p>
      </div>

      {/* AI Highlights Section */}
      {data?.insights && data.insights.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', border: '1px solid #dbeafe', borderRadius: 16, padding: 24, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
            <BarChart2 size={120} color="#3b82f6" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
             <div style={{ background: '#3b82f6', color: '#fff', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                AI POWERED
             </div>
             <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1e3a8a' }}>Key Strategic Insights</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {data.insights.slice(0, 3).map((insight: any, i: number) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: 16, border: '1px solid #fff' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{insight.title}</p>
                <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <KpiCard
          title="TOTAL REVENUE"
          value={`$${kpis.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change={kpis.revenueChange}
          icon={DollarSign}
          iconColor="#3b82f6"
          iconBg="#eff6ff"
        />
        <KpiCard
          title="TOTAL ORDERS"
          value={kpis.totalOrders.toLocaleString()}
          change={kpis.ordersChange}
          icon={ShoppingCart}
          iconColor="#22c55e"
          iconBg="#f0fdf4"
        />
        <KpiCard
          title="PROFIT MARGIN"
          value={kpis.profitMargin}
          change={kpis.marginChange}
          icon={BarChart2}
          iconColor="#f59e0b"
          iconBg="#fffbeb"
        />
        <KpiCard
          title="AVG. ORDER VALUE"
          value={`$${kpis.avgOrderValue.toFixed(2)}`}
          change={kpis.aovChange}
          icon={TrendingUp}
          iconColor="#8b5cf6"
          iconBg="#f5f3ff"
        />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Revenue Line Chart */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Monthly Revenue Trends</h3>
          <div style={{ height: 260 }}>
            <Line data={revenueChartData} options={revenueChartOptions} />
          </div>
        </div>

        {/* Donut */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Sales by Region</h3>
          <div style={{ height: 260 }}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
        {/* Seasonal Bar */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Seasonal Growth Patterns</h3>
          <div style={{ height: 220 }}>
            <Bar data={seasonalData} options={seasonalOptions} />
          </div>
        </div>

        {/* Top Products Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Top Selling Products</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['PRODUCT', 'UNITS', 'MARGIN', 'REVENUE'].map((h) => (
                  <th key={h} style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.8px', padding: '0 8px 10px', textAlign: 'left' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prod.map((p: any, i: number) => (
                <tr
                  key={i}
                  style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#f8fafc')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                >
                  <td style={{ padding: '11px 8px', fontSize: 13, fontWeight: 500, color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Package size={14} color="#94a3b8" />
                      {p.name}
                    </div>
                  </td>
                  <td style={{ padding: '11px 8px', fontSize: 13, color: '#374151' }}>{p.units.toLocaleString()}</td>
                  <td style={{ padding: '11px 8px', fontSize: 13, color: '#22c55e', fontWeight: 600 }}>{p.margin}</td>
                  <td style={{ padding: '11px 8px', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                    ${p.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Recent Transaction Activity</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {['TRANSACTION ID', 'CUSTOMER', 'PRODUCT', 'AMOUNT', 'STATUS', 'DATE'].map((h) => (
                <th key={h} style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.8px', padding: '0 8px 10px', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentTx.map((t: any, i: number) => {
              const sc = statusColors[t.status] || { bg: '#f1f5f9', color: '#64748b' };
              return (
                <tr
                  key={i}
                  style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#f8fafc')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                >
                  <td style={{ padding: '11px 8px', fontSize: 13, fontWeight: 600, color: '#3b82f6' }}>{t.id}</td>
                  <td style={{ padding: '11px 8px', fontSize: 13, color: '#374151' }}>{t.customer}</td>
                  <td style={{ padding: '11px 8px', fontSize: 13, color: '#64748b' }}>{t.product}</td>
                  <td style={{ padding: '11px 8px', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>${t.amount}</td>
                  <td style={{ padding: '11px 8px' }}>
                    <span
                      style={{
                        background: sc.bg,
                        color: sc.color,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 999,
                        textTransform: 'capitalize',
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: '11px 8px', fontSize: 13, color: '#94a3b8' }}>{t.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

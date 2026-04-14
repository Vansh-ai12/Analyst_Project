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
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

const dateRanges = ['Last 30 Days', 'Last 6 Months', 'Last 12 Months', 'All Time'];
const regions = ['All Regions', 'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
const categories = ['All Categories', 'Electronics', 'Furniture', 'Accessories', 'Software', 'Services'];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [dateRange, setDateRange] = useState('Last 6 Months');
  const [region, setRegion] = useState('All Regions');
  const [category, setCategory] = useState('All Categories');

  useEffect(() => {
    fetch('http://localhost:8000/current-data')
      .then(res => res.json())
      .then(json => {
        if (json.kpiData) setData(json);
      })
      .catch(err => console.error("No server data yet", err));
  }, []);

  const prof = data?.profitabilityData || { labels: ['No Data'], revenue: [0], cost: [0] };
  const reg = data?.salesByRegion || { labels: ['Awaiting Upload'], data: [100] };
  const trend = data?.customerTrends || { labels: ['Jan', 'Feb', 'Mar'], newCustomers: [0, 0, 0], returning: [0, 0, 0] };
  const kpis = data?.kpiData || { totalRevenue: 0, revenueChange: 0, profitMargin: 0, marginChange: 0, totalOrders: 0, ordersChange: 0, avgOrderValue: 0, aovChange: 0 };

  const profitChart = {
    labels: prof.labels,
    datasets: [
      {
        label: 'Revenue',
        data: prof.revenue,
        backgroundColor: '#3b82f6',
        borderRadius: 5,
        barThickness: 24,
      },
      {
        label: 'Cost',
        data: prof.cost,
        backgroundColor: '#ef4444',
        borderRadius: 5,
        barThickness: 24,
      },
    ],
  };

  const profitOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: { font: { size: 12 }, color: '#374151', boxWidth: 12, boxHeight: 12, usePointStyle: true, pointStyle: 'circle' },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.raw.toLocaleString()}`,
        },
      },
    },
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

  const trendChart = {
    labels: trend.labels,
    datasets: [
      {
        label: 'New Customers',
        data: trend.newCustomers,
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2.5,
      },
      {
        label: 'Returning Customers',
        data: trend.returning,
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2.5,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: { font: { size: 12 }, color: '#374151', boxWidth: 12, boxHeight: 12, usePointStyle: true, pointStyle: 'circle' },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 }, color: '#94a3b8' } },
      y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 12 }, color: '#94a3b8' } },
    },
  };

  const selectStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    padding: '9px 32px 9px 14px',
    fontSize: 14,
    fontWeight: 500,
    color: '#0f172a',
    background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center',
    appearance: 'none' as const,
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 4 }}>
          Analytics
        </h1>
        <p style={{ fontSize: 14, color: '#64748b' }}>Deep dive into your business performance metrics.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <select style={selectStyle} value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          {dateRanges.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select style={selectStyle} value={region} onChange={(e) => setRegion(e.target.value)}>
          {regions.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select style={selectStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 20 }}>
        {/* Profitability */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Profitability Analysis</h3>
          <div style={{ height: 280 }}>
            <Bar data={profitChart} options={profitOptions} />
          </div>
        </div>

        {/* Regional Donut */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Regional Sales Distribution</h3>
          <div style={{ height: 280 }}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>
      </div>

      {/* Customer Trends */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Customer Purchase Trends</h3>
        <div style={{ height: 260 }}>
          <Line data={trendChart} options={trendOptions} />
        </div>
      </div>

      {/* Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { label: 'Total Revenue', value: `$${kpis.totalRevenue.toLocaleString()}`, change: `${kpis.revenueChange}%`, positive: kpis.revenueChange >= 0 },
          { label: 'Average Margin', value: `${kpis.profitMargin}%`, change: `${kpis.marginChange}%`, positive: kpis.marginChange >= 0 },
          { label: 'Total Orders', value: kpis.totalOrders.toLocaleString(), change: `${kpis.ordersChange}%`, positive: kpis.ordersChange >= 0 },
          { label: 'Avg Order Value', value: `$${kpis.avgOrderValue.toFixed(2)}`, change: `${kpis.aovChange}%`, positive: kpis.aovChange >= 0 },
        ].map(({ label, value, change, positive }) => (
          <div
            key={label}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '18px 20px',
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
              {label}
            </p>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 4 }}>
              {value}
            </p>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: positive ? '#22c55e' : '#ef4444',
                background: positive ? '#f0fdf4' : '#fef2f2',
                padding: '2px 8px',
                borderRadius: 999,
              }}
            >
              {change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

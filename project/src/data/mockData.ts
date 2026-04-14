// ─── KPI Summary ───────────────────────────────────────────────────────────
export const kpiData = {
  totalRevenue: 128430,
  totalOrders: 1240,
  profitMargin: 24.8,
  avgOrderValue: 103.57,
  revenueChange: 12.5,
  ordersChange: 3.2,
  marginChange: -1.1,
  aovChange: 5.4,
};

// ─── Monthly Revenue ────────────────────────────────────────────────────────
export const monthlyRevenue = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  data: [18200, 20100, 19800, 24500, 26800, 31200, 29700, 34100, 35400, 38900, 41200, 43800],
};

// ─── Sales by Region ────────────────────────────────────────────────────────
export const salesByRegion = {
  labels: ['North America','Europe','Asia Pacific','Latin America','Middle East'],
  data: [42, 24, 18, 10, 6],
  colors: ['#3b82f6','#22c55e','#f59e0b','#a855f7','#14b8a6'],
};

// ─── Seasonal Growth ────────────────────────────────────────────────────────
export const seasonalGrowth = {
  labels: ['Q1','Q2','Q3','Q4'],
  data: [15, 22, 18, 42],
};

// ─── Top Selling Products ───────────────────────────────────────────────────
export const topProducts = [
  { name: 'Premium Wireless Headphones', units: 432, margin: '32.1%', revenue: 86357 },
  { name: 'USB-C Hub Adapters', units: 389, margin: '45.3%', revenue: 54420 },
  { name: 'Ergonomic Office Chair', units: 201, margin: '28.7%', revenue: 49847 },
  { name: 'Smart Watch Series X', units: 178, margin: '38.4%', revenue: 67120 },
  { name: 'Portable SSD 1TB', units: 156, margin: '22.9%', revenue: 31200 },
];

// ─── Recent Transactions ────────────────────────────────────────────────────
export const recentTransactions = [
  { id: 'TXN-8821', customer: 'Acme Corp', product: 'Smart Watch Series X', amount: 378, status: 'completed', date: '2024-12-15' },
  { id: 'TXN-8820', customer: 'TechStart Inc', product: 'USB-C Hub Adapters', amount: 140, status: 'completed', date: '2024-12-15' },
  { id: 'TXN-8819', customer: 'GlobalSME', product: 'Premium Wireless Headphones', amount: 200, status: 'processing', date: '2024-12-14' },
  { id: 'TXN-8818', customer: 'RetailMax', product: 'Ergonomic Office Chair', units: 2, amount: 498, status: 'completed', date: '2024-12-14' },
  { id: 'TXN-8817', customer: 'DataDrive Ltd', product: 'Portable SSD 1TB', amount: 200, status: 'refunded', date: '2024-12-13' },
];

// ─── Profitability Analysis ──────────────────────────────────────────────────
export const profitabilityData = {
  labels: ['Electronics','Furniture','Accessories','Software','Services'],
  revenue: [86357, 49847, 34200, 15800, 12400],
  cost: [58680, 35490, 22680, 5530, 5580],
};

// ─── Customer Purchase Trends ────────────────────────────────────────────────
export const customerTrends = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  newCustomers: [120, 145, 132, 168, 190, 210, 198, 230, 245, 270, 290, 320],
  returning: [280, 295, 310, 330, 355, 380, 370, 410, 425, 450, 470, 430],
};

// ─── Insights ───────────────────────────────────────────────────────────────
export const insights = [
  {
    id: 1,
    type: 'positive',
    icon: 'trending-up',
    value: '+18.7%',
    badge: 'HIGH IMPACT',
    badgeColor: 'green',
    title: 'Region A Revenue Surge',
    description: 'North America has the highest revenue growth at 18.7% QoQ, driven by electronics and accessories categories.',
  },
  {
    id: 2,
    type: 'positive',
    icon: 'dollar-sign',
    value: '45.3%',
    badge: 'HIGH IMPACT',
    badgeColor: 'blue',
    title: 'Highest Profit Margin Product',
    description: 'USB-C Hub Adapters generate the highest profit margin at 45.3%, suggesting opportunity for increased marketing spend.',
  },
  {
    id: 3,
    type: 'positive',
    icon: 'calendar',
    value: '+42%',
    badge: 'HIGH IMPACT',
    badgeColor: 'yellow',
    title: 'Holiday Season Impact',
    description: 'Q4 2024 showed a 42% revenue spike compared to Q3, with peak sales during Black Friday and Cyber Monday weeks.',
  },
  {
    id: 4,
    type: 'warning',
    icon: 'alert-triangle',
    value: '-6.3%',
    badge: 'HIGH IMPACT',
    badgeColor: 'red',
    title: 'Profitability Leak Detected',
    description: 'Furniture category shows declining margins (28.4% → 22.1%) over the last quarter. Shipping cost increases identified as primary driver.',
  },
  {
    id: 5,
    type: 'positive',
    icon: 'trending-up',
    value: '+3.6%',
    badge: 'MEDIUM IMPACT',
    badgeColor: 'green',
    title: 'Customer Retention Improving',
    description: 'Returning customer rate increased from 73.9% to 70.3% over six months. Email campaigns showing 2.4x ROI.',
  },
  {
    id: 6,
    type: 'warning',
    icon: 'alert-triangle',
    value: '74.2%',
    badge: 'HIGH IMPACT',
    badgeColor: 'red',
    title: 'Cart Abandonment Spike',
    description: 'Cart abandonment rate jumped to 74.2% in March, 8% above average. Checkout friction on mobile identified as likely cause.',
  },
];

// ─── Upload Preview Data ─────────────────────────────────────────────────────
export const previewData = {
  headers: ['order_id', 'date', 'product', 'category', 'quantity', 'unit_price', 'region', 'customer_id'],
  rows: [
    ['ORD-001', '2024-01-05', 'Wireless Headphones', 'Electronics', '2', '$199.99', 'North America', 'C-1042'],
    ['ORD-002', '2024-01-06', 'USB-C Hub', 'Accessories', '1', '$49.99', 'Europe', 'C-2891'],
    ['ORD-003', '2024-01-06', 'Office Chair', 'Furniture', '1', '$399.99', 'Asia Pacific', 'C-0334'],
    ['ORD-004', '2024-01-07', 'Smart Watch', 'Electronics', '1', '$299.99', 'North America', 'C-5621'],
    ['ORD-005', '2024-01-08', 'Portable SSD', 'Electronics', '3', '$89.99', 'Latin America', 'C-7712'],
  ],
};

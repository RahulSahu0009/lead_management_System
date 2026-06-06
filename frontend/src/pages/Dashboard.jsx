import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getLeads, getStats } from '../api/leadApi.js';
import LeadTable from '../components/LeadTable.jsx';
import LoadingState from '../components/LoadingState.jsx';
import StatCard from '../components/StatCard.jsx';
import { buildStatusChartData, buildTimelineData, getRecentLeads } from '../utils/helpers.js';
import '../styles/components/Dashboard.css';

const statusColors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-teal)', 'var(--color-success)', 'var(--color-danger)'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [chartLeads, setChartLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      try {
        const [statsResponse, leadsResponse] = await Promise.all([
          getStats(),
          getLeads({ page: 1, limit: 100, sort: 'createdAt', order: 'desc' }),
        ]);

        setStats(statsResponse);
        setRecentLeads(getRecentLeads(leadsResponse.leads || [], 5));
        setChartLeads(leadsResponse.leads || []);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading || !stats) {
    return <LoadingState rows={6} />;
  }

  const statusChartData = buildStatusChartData(stats);
  const timelineData = buildTimelineData(chartLeads);

  return (
    <div className="dashboard-grid fade-in">
      <section className="dashboard-hero">
        <p className="dashboard-hero__eyebrow">Pipeline health</p>
        <h2 className="dashboard-hero__title">Track every lead from first contact to conversion.</h2>
        <div className="dashboard-hero__metric">Conversion rate {stats.conversionRate}%</div>
      </section>

      <section className="dashboard-stats">
        <StatCard title="Total Leads" value={stats.total} tone="primary" subtitle="All records in the CRM" />
        <StatCard title="New" value={stats.newLeads} tone="accent" subtitle="Awaiting first touch" />
        <StatCard title="Contacted" value={stats.contacted} tone="primary" subtitle="In active follow-up" />
        <StatCard title="Qualified" value={stats.qualified} tone="teal" subtitle="Strong opportunities" />
        <StatCard title="Converted" value={stats.converted} tone="success" subtitle="Won deals" />
        <StatCard title="Lost" value={stats.lost} tone="danger" subtitle="Closed out" />
      </section>

      <section className="dashboard-panels">
        <article className="dashboard-panel page-card">
          <h2 className="section-heading">Leads by status</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted)" />
              <YAxis stroke="var(--color-muted)" />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {statusChartData.map((entry, index) => (
                  <Cell key={entry.name} fill={statusColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="dashboard-panel page-card">
          <h2 className="section-heading">Leads added in the last 30 days</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="label" stroke="var(--color-muted)" />
              <YAxis stroke="var(--color-muted)" allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="var(--color-primary)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className="dashboard-section page-card">
        <div className="dashboard-section__header">
          <h2 className="section-heading">Recent leads</h2>
          <span>{recentLeads.length} latest records</span>
        </div>
        <LeadTable leads={recentLeads} loading={false} showActions={false} compact />
      </section>
    </div>
  );
};

export default Dashboard;
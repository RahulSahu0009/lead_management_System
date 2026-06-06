import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteLead } from '../api/leadApi.js';
import ConfirmModal from '../components/ConfirmModal.jsx';
import LeadTable from '../components/LeadTable.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useLeadContext } from '../context/LeadContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/components/LeadsPage.css';

const Leads = () => {
  const navigate = useNavigate();
  const { leads, filters, pagination, loading, error, setFilters, setPage, refreshLeads } = useLeadContext();
  const { addToast } = useToast();
  const [searchValue, setSearchValue] = useState(filters.search);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const sortOptions = useMemo(
    () => [
      { label: 'Created', value: 'createdAt' },
      { label: 'Name', value: 'name' },
      { label: 'Company', value: 'company' },
      { label: 'Status', value: 'status' },
    ],
    [],
  );

  const submitSearch = (event) => {
    event.preventDefault();
    setFilters({ search: searchValue });
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    await deleteLead(deleteTarget._id);
    addToast('Lead deleted successfully', 'success');
    setDeleteTarget(null);
    refreshLeads();
  };

  const handleEdit = (lead) => navigate(`/leads/${lead._id}/edit`);
  const handleView = (lead) => navigate(`/leads/${lead._id}`);

  return (
    <div className="leads-page fade-in">
      <section className="page-header">
        <div>
          <h2 className="page-title">All leads</h2>
          <p className="page-subtitle">Search, filter, sort, and manage every contact in one place.</p>
        </div>
        <Link to="/leads/new" className="button button--primary">
          Add lead
        </Link>
      </section>

      <section className="page-card leads-toolbar">
        <div className="leads-toolbar__actions" style={{ gridColumn: '1 / -1' }}>
          <SearchBar value={searchValue} onChange={(event) => setSearchValue(event.target.value)} onSubmit={submitSearch} />
          <label>
            <span>Status</span>
            <select value={filters.status} onChange={(event) => setFilters({ status: event.target.value })}>
              <option value="">All statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </label>
          <label>
            <span>Sort by</span>
            <select value={filters.sortField} onChange={(event) => setFilters({ sortField: event.target.value })}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Order</span>
            <select value={filters.sortOrder} onChange={(event) => setFilters({ sortOrder: event.target.value })}>
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>
        </div>
      </section>

      {error ? <section className="page-card" style={{ padding: '18px', color: 'var(--color-danger)' }}>{error}</section> : null}

      <section className="page-card" style={{ padding: '0' }}>
        <LeadTable leads={leads} loading={loading} onView={(lead) => `/leads/${lead._id}`} onEdit={(lead) => `/leads/${lead._id}/edit`} onDelete={(lead) => setDeleteTarget(lead)} />
      </section>

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />

      {deleteTarget ? (
        <ConfirmModal
          isOpen={Boolean(deleteTarget)}
          message={`Delete ${deleteTarget.name} from ${deleteTarget.company}? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      ) : null}
    </div>
  );
};

export default Leads;
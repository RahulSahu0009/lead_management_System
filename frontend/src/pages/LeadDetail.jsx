import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteLead, getLeadById } from '../api/leadApi.js';
import ConfirmModal from '../components/ConfirmModal.jsx';
import LoadingState from '../components/LoadingState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useLeadContext } from '../context/LeadContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatDateTime } from '../utils/helpers.js';
import '../styles/components/LeadDetail.css';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshLeads } = useLeadContext();
  const { addToast } = useToast();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const loadLead = async () => {
      setLoading(true);
      try {
        const payload = await getLeadById(id);
        setLead(payload);
      } finally {
        setLoading(false);
      }
    };

    loadLead();
  }, [id]);

  const handleDelete = async () => {
    await deleteLead(id);
    addToast('Lead deleted successfully', 'success');
    refreshLeads();
    navigate('/leads');
  };

  if (loading) {
    return <LoadingState rows={6} />;
  }

  if (!lead) {
    return (
      <section className="page-card" style={{ padding: '24px' }}>
        <p>Lead not found.</p>
      </section>
    );
  }

  return (
    <div className="lead-detail fade-in">
      <section className="page-header">
        <div>
          <Link to="/leads" className="button button--ghost">
            Back to leads
          </Link>
          <h2 className="page-title" style={{ marginTop: '16px' }}>{lead.name}</h2>
          <p className="page-subtitle">{lead.company} · {lead.email}</p>
        </div>
        <div className="lead-detail__actions">
          <Link to={`/leads/${id}/edit`} className="button button--primary">
            Edit
          </Link>
          <button type="button" className="button button--danger" onClick={() => setConfirmOpen(true)}>
            Delete
          </button>
        </div>
      </section>

      <section className="page-card lead-detail__card">
        <div className="lead-detail__header">
          <div>
            <h2>Lead details</h2>
            <p className="page-subtitle">Full profile and lifecycle timeline.</p>
          </div>
          <StatusBadge status={lead.status} />
        </div>

        <div className="lead-detail__grid">
          <div className="lead-detail__field">
            <span>Name</span>
            <strong>{lead.name}</strong>
          </div>
          <div className="lead-detail__field">
            <span>Company</span>
            <strong>{lead.company}</strong>
          </div>
          <div className="lead-detail__field">
            <span>Email</span>
            <strong>{lead.email}</strong>
          </div>
          <div className="lead-detail__field">
            <span>Phone</span>
            <strong>{lead.phone}</strong>
          </div>
          <div className="lead-detail__field">
            <span>Created</span>
            <strong>{formatDateTime(lead.createdAt)}</strong>
          </div>
          <div className="lead-detail__field">
            <span>Updated</span>
            <strong>{formatDateTime(lead.updatedAt)}</strong>
          </div>
        </div>
      </section>

      <section className="page-card lead-detail__notes">
        <h3 className="section-heading">Notes</h3>
        <p>{lead.notes || 'No notes have been added for this lead yet.'}</p>
      </section>

      <ConfirmModal
        isOpen={confirmOpen}
        message={`Delete ${lead.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default LeadDetail;
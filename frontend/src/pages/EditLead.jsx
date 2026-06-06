import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLeadById, updateLead } from '../api/leadApi.js';
import LeadForm from '../components/LeadForm.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { useLeadContext } from '../context/LeadContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshLeads } = useLeadContext();
  const { addToast } = useToast();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (formData) => {
    await updateLead(id, formData);
    addToast('Lead updated successfully', 'success');
    refreshLeads();
    navigate('/leads');
  };

  if (loading) {
    return <LoadingState rows={5} />;
  }

  return (
    <div className="fade-in">
      <section className="page-header">
        <div>
          <h2 className="page-title">Edit lead</h2>
          <p className="page-subtitle">Update the details, status, and notes for this contact.</p>
        </div>
      </section>
      <LeadForm initialValues={lead} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditLead;
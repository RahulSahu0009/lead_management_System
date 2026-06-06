import { useNavigate } from 'react-router-dom';
import { createLead } from '../api/leadApi.js';
import LeadForm from '../components/LeadForm.jsx';
import { useLeadContext } from '../context/LeadContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const AddLead = () => {
  const navigate = useNavigate();
  const { refreshLeads } = useLeadContext();
  const { addToast } = useToast();

  const handleSubmit = async (formData) => {
    await createLead(formData);
    addToast('Lead created successfully', 'success');
    refreshLeads();
    navigate('/leads');
  };

  return (
    <div className="fade-in">
      <section className="page-header">
        <div>
          <p className="page-subtitle">Capture a new prospect and start tracking the pipeline immediately.</p>
        </div>
      </section>
      <LeadForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddLead;
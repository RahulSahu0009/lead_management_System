import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getEmptyLead, sanitizeLeadFormData, statusOptions, validateLeadField } from '../utils/helpers.js';
import StatusBadge from './StatusBadge.jsx';
import '../styles/components/LeadForm.css';

const LeadForm = ({ initialValues = null, onSubmit, loading = false }) => {
  const [formValues, setFormValues] = useState(getEmptyLead());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        ...getEmptyLead(),
        ...initialValues,
      });
    }
  }, [initialValues]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));

    if (touched[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateLeadField(name, value),
      }));
    }
  };

  const handleFieldBlur = (event) => {
    const { name, value } = event.target;
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateLeadField(name, value),
    }));
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formValues).forEach((field) => {
      const validationMessage = validateLeadField(field, formValues[field]);
      if (validationMessage) {
        nextErrors[field] = validationMessage;
      }
    });
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, company: true });
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(sanitizeLeadFormData(formValues));
  };

  return (
    <form className="lead-form page-card" onSubmit={handleSubmit} noValidate>
      <div className="lead-form__grid">
        <label>
          <span>Name</span>
          <input name="name" value={formValues.name} onChange={handleFieldChange} onBlur={handleFieldBlur} placeholder="Alex Morgan" />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={formValues.email} onChange={handleFieldChange} onBlur={handleFieldBlur} placeholder="alex@company.com" />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" value={formValues.phone} onChange={handleFieldChange} onBlur={handleFieldBlur} placeholder="+1 555 010 1234" />
          {errors.phone ? <small>{errors.phone}</small> : null}
        </label>
        <label>
          <span>Company</span>
          <input name="company" value={formValues.company} onChange={handleFieldChange} onBlur={handleFieldBlur} placeholder="Acme Inc." />
          {errors.company ? <small>{errors.company}</small> : null}
        </label>
        <label className="lead-form__full">
          <span>Status</span>
          <select name="status" value={formValues.status} onChange={handleFieldChange}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="lead-form__status-preview">
            <StatusBadge status={formValues.status} />
          </div>
        </label>
        <label className="lead-form__full">
          <span>Notes</span>
          <textarea name="notes" rows="5" value={formValues.notes} onChange={handleFieldChange} placeholder="Add any background, campaign source, or follow-up notes." />
        </label>
      </div>
      <div className="lead-form__actions">
        <button type="submit" className="button button--primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save lead'}
        </button>
      </div>
    </form>
  );
};

LeadForm.propTypes = {
  initialValues: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default LeadForm;
export const statusOptions = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export const statusToneMap = {
  New: 'new',
  Contacted: 'contacted',
  Qualified: 'qualified',
  Converted: 'converted',
  Lost: 'lost',
};

export const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const formatDateTime = (value) =>
  new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

export const formatCompactDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

export const getStatusTone = (status) => statusToneMap[status] || 'new';

export const getStatusColorVar = (status) => {
  switch (status) {
    case 'Contacted':
      return 'var(--color-accent-bg)';
    case 'Qualified':
      return 'var(--color-teal-bg)';
    case 'Converted':
      return 'var(--color-success)';
    case 'Lost':
      return 'var(--color-lost-bg)';
    default:
      return 'var(--color-primary-soft)';
  }
};

export const getStatusTextColorVar = (status) => {
  switch (status) {
    case 'Contacted':
      return 'var(--color-accent)';
    case 'Qualified':
      return 'var(--color-teal-dark)';
    case 'Converted':
      return 'var(--color-white)';
    case 'Lost':
      return 'var(--color-lost-text)';
    default:
      return 'var(--color-primary)';
  }
};

export const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items = [1];
  const left = Math.max(currentPage - 1, 2);
  const right = Math.min(currentPage + 1, totalPages - 1);

  if (left > 2) {
    items.push('ellipsis-left');
  }

  for (let page = left; page <= right; page += 1) {
    items.push(page);
  }

  if (right < totalPages - 1) {
    items.push('ellipsis-right');
  }

  items.push(totalPages);
  return items;
};

export const getPageNumbers = (currentPage, totalPages) => getPaginationItems(currentPage, totalPages);

export const buildDailySeries = (leads, days = 30) => {
  const seriesMap = new Map();
  const today = new Date();

  for (let index = days - 1; index >= 0; index -= 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - index);
    const key = day.toISOString().slice(0, 10);
    seriesMap.set(key, { date: key, label: formatCompactDate(day), count: 0 });
  }

  leads.forEach((lead) => {
    const key = new Date(lead.createdAt).toISOString().slice(0, 10);
    if (seriesMap.has(key)) {
      seriesMap.get(key).count += 1;
    }
  });

  return Array.from(seriesMap.values());
};

export const buildTimelineData = (leads, days = 30) => buildDailySeries(leads, days);

export const buildStatusSeries = (stats) => [
  { name: 'New', count: stats.newLeads || 0 },
  { name: 'Contacted', count: stats.contacted || 0 },
  { name: 'Qualified', count: stats.qualified || 0 },
  { name: 'Converted', count: stats.converted || 0 },
  { name: 'Lost', count: stats.lost || 0 },
];

export const buildStatusChartData = (stats) =>
  buildStatusSeries(stats).map(({ name, count }) => ({
    name,
    value: count,
  }));

export const getRecentLeads = (leads, count = 5) => leads.slice(0, count);

export const getEmptyLead = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'New',
  notes: '',
});

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isValidPhone = (value) => /^[0-9+()\-\s]{7,20}$/.test(value.trim());

export const validateLeadField = (field, value) => {
  const trimmedValue = String(value ?? '').trim();

  switch (field) {
    case 'name':
      return trimmedValue ? '' : 'Name is required';
    case 'email':
      if (!trimmedValue) {
        return 'Email is required';
      }
      return isValidEmail(trimmedValue) ? '' : 'Enter a valid email address';
    case 'phone':
      if (!trimmedValue) {
        return 'Phone is required';
      }
      return isValidPhone(trimmedValue) ? '' : 'Enter a valid phone number';
    case 'company':
      return trimmedValue ? '' : 'Company is required';
    default:
      return '';
  }
};

export const sanitizeLeadFormData = (formValues) => ({
  name: formValues.name.trim(),
  email: formValues.email.trim().toLowerCase(),
  phone: formValues.phone.trim(),
  company: formValues.company.trim(),
  status: formValues.status,
  notes: formValues.notes.trim(),
});

export const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

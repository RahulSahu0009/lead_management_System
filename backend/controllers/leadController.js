import Lead from '../models/Lead.js';

const buildSearchQuery = (search) => {
  if (!search) {
    return {};
  }

  const regex = new RegExp(search, 'i');
  return {
    $or: [{ name: regex }, { email: regex }, { company: regex }],
  };
};

const buildSort = (sortField = 'createdAt', order = 'desc') => {
  const allowedSortFields = ['name', 'email', 'phone', 'company', 'status', 'createdAt', 'updatedAt'];
  const field = allowedSortFields.includes(sortField) ? sortField : 'createdAt';
  return { [field]: order === 'asc' ? 1 : -1 };
};

const sendSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ success: true, data });
};

export const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  sendSuccess(res, lead, 201);
};

export const getAllLeads = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const status = req.query.status;
  const search = req.query.search?.trim();
  const filter = { ...buildSearchQuery(search) };

  if (status) {
    filter.status = status;
  }

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort(buildSort(req.query.sort, req.query.order))
      .skip((page - 1) * limit)
      .limit(limit),
    Lead.countDocuments(filter),
  ]);

  sendSuccess(res, {
    leads,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
};

export const getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }

  sendSuccess(res, lead);
};

export const updateLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }

  Object.assign(lead, req.body);
  await lead.save();

  sendSuccess(res, lead);
};

export const deleteLead = async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }

  sendSuccess(res, { id: lead._id, message: 'Lead deleted successfully' });
};

export const searchLeads = async (req, res) => {
  const query = req.query.q?.trim();

  if (!query) {
    sendSuccess(res, { leads: [] });
    return;
  }

  const regex = new RegExp(query, 'i');
  const leads = await Lead.find({
    $or: [{ name: regex }, { email: regex }, { company: regex }],
  })
    .sort({ createdAt: -1 })
    .limit(25);

  sendSuccess(res, { leads });
};

export const getStats = async (req, res) => {
  const [total, grouped] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const counts = grouped.reduce(
    (accumulator, item) => ({
      ...accumulator,
      [item._id]: item.count,
    }),
    {},
  );

  const converted = counts.Converted || 0;
  sendSuccess(res, {
    total,
    newLeads: counts.New || 0,
    contacted: counts.Contacted || 0,
    qualified: counts.Qualified || 0,
    converted,
    lost: counts.Lost || 0,
    conversionRate: total === 0 ? 0 : Number(((converted / total) * 100).toFixed(1)),
  });
};
import { Router } from 'express';
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLeadById,
  getStats,
  searchLeads,
  updateLead,
} from '../controllers/leadController.js';

const router = Router();

router.post('/', createLead);
router.get('/', getAllLeads);
router.get('/search', searchLeads);
router.get('/stats', getStats);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
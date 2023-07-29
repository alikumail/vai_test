
import express from 'express';
import {
  createAppointment,
  getAppointmentsByPatient,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentController.mjs';

const router = express.Router();

router.post('/', createAppointment);
router.get('/patient/:patientId', getAppointmentsByPatient);
router.put('/:appointmentId', updateAppointment);
router.delete('/:appointmentId', deleteAppointment);

export default router;

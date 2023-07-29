import express from 'express';
import doctorController from '../controllers/doctorDetailsController.mjs';

const router = express.Router();

router.post('/', doctorController.createDoctorDetails);
router.get('/', doctorController.getAllDoctors);
router.get('/slots', doctorController.getDoctorAvailabilityById);
router.get('/:id', doctorController.getDoctorDetails);
router.put('/:id', doctorController.updateDoctorDetails);
router.delete('/:id', doctorController.deleteDoctorDetails);
router.post('/:id/booking', doctorController.addBookingSlot);

export default router;

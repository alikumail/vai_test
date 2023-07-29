// controllers/appointmentController.mjs
import Appointment from '../models/Appointment.mjs';

export const createAppointment = async (req, res) => {
  const { patientId, doctorId, date, status } = req.body;

  const newAppointment = new Appointment({
    patient: patientId,
    doctor: doctorId,
    date: new Date(date),
    status: status
  });

  try {
    const savedAppointment = await newAppointment.save();
    return res.status(200).json(savedAppointment);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patient: patientId });
    return res.status(200).json(appointments);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    return res.status(200).json(appointment);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    await Appointment.findByIdAndRemove(appointmentId);
    return res.status(200).json({ message: 'Appointment deleted successfully.' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

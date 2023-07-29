import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import appointmentRoutes from './routes/appointmentRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import doctorAvailabilityRoutes from './routes/doctorDetailsRoutes.mjs';

dotenv.config();

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/vaitest';
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


//-------- Parsing ----------//
app.use(express.json());

//------- allow cross-origin requests --------//
app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorAvailabilityRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

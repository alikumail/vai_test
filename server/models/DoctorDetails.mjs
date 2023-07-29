
import mongoose from 'mongoose';

const { Schema } = mongoose;

const workingDay = new Schema({
  workingDay : {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  workingHours: {
    type: Number,
    required: true
  }
});

const bookSlotSchema = new Schema({
  Date : {
    type: Date,
  },
  SlotTime: [{
    type: String,
    required: true
  }]
});


const doctorDetailsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialization: {
    type: String,
  },
  availability: {
    type: [workingDay],
  },
  booking: {
    type: [bookSlotSchema],
  }
});

const DoctorDetails = mongoose.model('DoctorDetails', doctorDetailsSchema);

export default DoctorDetails;

import DoctorDetails from "../models/DoctorDetails.mjs"
import moment from "moment";

const doctorDetailsController = {};

doctorDetailsController.createDoctorDetails = async (req, res) => {
  try {
    const { user, workingDays } = req.body;
    const availability = workingDays.filter(item => item.isSelected);
    const doctor = new DoctorDetails({ user, availability });
    await doctor.save();
    res.status(201).json({ message: "Doctor details created successfully.", doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


doctorDetailsController.getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorDetails.find({}).populate('user', 'email','profileImage');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


doctorDetailsController.getDoctorDetails = async (req, res) => {
  try {
    const doctor = await DoctorDetails.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


doctorDetailsController.updateDoctorDetails = async (req, res) => {
  try {
    const doctor = await DoctorDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    res.status(200).json({ message: "Doctor details updated successfully.", doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


doctorDetailsController.deleteDoctorDetails = async (req, res) => {
  try {
    const doctor = await DoctorDetails.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    res.status(200).json({ message: "Doctor details deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


doctorDetailsController.addBookingSlot = async (req, res) => {
  try {
    const doctor = await DoctorDetails.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    doctor.booking.push(req.body);
    await doctor.save();
    res.status(200).json({ message: "New booking slot added successfully.", doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get doctor availability by ID
doctorDetailsController.getDoctorAvailabilityById = async (req, res) => {
  try {
    let A = new Date(req.query.date);
    let day=A.toLocaleString('en-us', {weekday: 'long'});

    const doctorDetails = await DoctorDetails.findOne({
      "user" : req.query.user, 
      "availability": { $elemMatch: { "workingDay" : day } }
    }, {"availability.$": 1});
    let availableSlots = [];
    if (doctorDetails) {

      let slotsStart = doctorDetails.availability[0].startTime;
      let [hours, minutes] = slotsStart.split(':');
      let startDate = new Date();
      startDate.setHours(parseInt(hours));
      startDate.setMinutes(parseInt(minutes));

      let queryDate = moment(req.query.date, "YYYY-MM-DD").startOf('day').toDate();
  
      const booking = await DoctorDetails.findOne({
        "user" : req.query.user, 
        "booking": { 
          $elemMatch: { 
            "Date" : {
              $gte: queryDate,
              $lt: moment(queryDate).add(1, 'days').toDate()
            }
          } 
        }
      },{"booking.$": 1});
   
      
      for(let i=0; i<doctorDetails.availability[0].workingHours; i++) {
          let options = { hour: '2-digit', minute: '2-digit' };
          let startSlot = new Date(startDate.getTime() + i*60*60*1000).toLocaleTimeString(undefined, options);
          availableSlots.push({ start: startSlot });
              
      }
  }
    
    if (!doctorDetails || doctorDetails.length === 0) {
      return res.status(404).json({ message: 'Doctor availability not found on that date.' });
    }
    res.status(200).json({availableSlots: availableSlots});
  } catch (error) {
      console.log(error);
    res.status(500).json({ message: 'An error occurred while fetching doctor availability.' });
  }
};


export default doctorDetailsController;

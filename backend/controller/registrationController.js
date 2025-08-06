// server/controllers/registrationController.js
import Registration from '../model/registrationModel.js';
import Event from '../model/eventModel.js';

const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const alreadyRegistered = await Registration.findOne({
      userId: req.user.id,
      eventId,
    });

    if (alreadyRegistered) {
        return res.status(400).json({ 
            message: 'Already registered for this event' 
        });
    }
    // console.log("eventId", eventId);
    // console.log("userId", req.user.id);


    const registration = new Registration({
      userId: req.user.id,
      eventId,
    });

    await registration.save();

    await Event.findByIdAndUpdate(eventId, {
      $inc: { registrationCount: 1 },
    });

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};
export default registerForEvent;
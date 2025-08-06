// server/controllers/eventController.js
import Event from "../model/eventModel.js";
import { eventCreated, eventsFetchedFailure, eventsFetchedSuccess } from "../utils/message.js";

const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      organizerId: req.user.id,
    });

    await newEvent.save();
    res.status(201).json({
        newEvent, 
        success : true, 
        message : eventCreated
    })
  } catch (err) {
    res.status(500).json({ 
        message: 'Event creation failed', 
        error: err.message 
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizerId', 'name email');
    res.status(200).json({
        success : true, 
        message : eventsFetchedSuccess,
        events
    })
  } catch (err) {
    res.status(500).json({ 
        message: eventsFetchedFailure, 
        error: err.message 
    });
  }
};
export {createEvent, getAllEvents};
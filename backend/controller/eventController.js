// server/controllers/eventController.js
import Event from "../model/eventModel.js";
import { eventCreated } from "../utils/message.js";

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

export {createEvent};
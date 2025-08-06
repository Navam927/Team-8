// server/controllers/eventController.js
import Event from "../model/eventModel.js";
import { eventCreated, eventsFetchedFailure, eventsFetchedSuccess, userUnauthorized, EventUpdated, EventNotFound, EventDeleteSuccess, EventDeleteFailure } from "../utils/message.js";

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

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);

   
    if (!event) {
        return res.status(404).json({
            message : EventNotFound,
            success : false 
        })
    }

    if (event.organizerId.toString() !== req.user.id) {
        return res.status(403).json({ 
            message: userUnauthorized,
            success : false
        });
    }

    console.log(event);

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        success : true,     
        message : EventUpdated, 
        updatedEvent
    })
  } catch (err) {
    res.status(500).json({ 
        message: 'Failed to update event', 
        error: err.message
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({
            message : EventNotFound,
            success : false 
        })
    }

    if (event.organizerId.toString() !== req.user.id) {
        return res.status(403).json({ 
            message: userUnauthorized,
            success : false
        });
    }


    await Event.findByIdAndDelete(id);
    res.status(200).json({ 
        message: EventDeleteSuccess, 
        success : true   
    });
  } catch (err) {
    res.status(500).json({ 
        message: EventDeleteFailure,
        error: err.message 
    });
  }
};

export {createEvent, getAllEvents, updateEvent, deleteEvent};
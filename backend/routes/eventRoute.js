import express from 'express';

import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controller/eventController.js';
import verifyToken from '../middleware/auth.js';
import registerForEvent from '../controller/registrationController.js';

const eventRouter = express.Router();

eventRouter.post('/create', verifyToken, createEvent);

eventRouter.get('/get', getAllEvents);

eventRouter.post('/update/:id', verifyToken, updateEvent)

eventRouter.post('/delete/:id', verifyToken, deleteEvent);

eventRouter.post('/register/:eventId',verifyToken, registerForEvent);

export default eventRouter;
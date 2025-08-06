import express from 'express';

import { createEvent, getAllEvents, updateEvent } from '../controller/eventController.js';
import verifyToken from '../middleware/auth.js';

const eventRouter = express.Router();

eventRouter.post('/create', verifyToken, createEvent);

eventRouter.get('/get', getAllEvents);

eventRouter.post('/update/:id', verifyToken, updateEvent)

// router.post('/:id/register', auth, registerForEvent);

export default eventRouter;
import express from 'express';

import { createEvent, getAllEvents } from '../controller/eventController.js';
import verifyToken from '../middleware/auth.js';

const eventRouter = express.Router();

eventRouter.post('/create', verifyToken, createEvent);

eventRouter.get('/get', getAllEvents);
// router.get('/:id', getEventById);

// router.post('/:id/register', auth, registerForEvent);

export default eventRouter;
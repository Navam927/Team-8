import express from 'express';

import { createEvent } from '../controller/eventController.js';
import verifyToken from '../middleware/auth.js';

const eventRouter = express.Router();

eventRouter.post('/create', verifyToken, createEvent);

// router.get('/', getAllEvents);
// router.get('/:id', getEventById);

// router.post('/:id/register', auth, registerForEvent);

export default eventRouter;
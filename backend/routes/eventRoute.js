const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  registerForEvent
} = require('../controllers/eventController');

const auth = require('../middlewares/auth');

router.post('/', auth, createEvent);

router.get('/', getAllEvents);
router.get('/:id', getEventById);

router.post('/:id/register', auth, registerForEvent);

module.exports = router;

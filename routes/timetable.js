const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Timetable = require('../models/Timetable');
const User = require('../models/User');
const { generateTimetable } = require('../utils/timetableGenerator');

// @route   POST /api/timetable/create
// @desc    Create/Save timetable draft
// @access  Private
router.post('/create', auth, async (req, res) => {
  try {
    const timetableData = {
      userId: req.user.id,
      ...req.body
    };

    const timetable = new Timetable(timetableData);
    await timetable.save();

    res.json({ success: true, timetable });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// @route   POST /api/timetable/generate
// @desc    Generate timetable
// @access  Private
router.post('/generate', auth, async (req, res) => {
  try {
    // Check user's free generation limit
    const user = await User.findById(req.user.id);
    
    if (!user.isPremium && user.freeGenerationsUsed >= user.freeGenerationsLimit) {
      return res.status(403).json({ 
        success: false, 
        limitReached: true,
        message: 'Your free limit is over. Please purchase a plan to continue.',
        freeGenerationsUsed: user.freeGenerationsUsed,
        freeGenerationsLimit: user.freeGenerationsLimit
      });
    }

    const result = generateTimetable(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    // Only increment on successful generation
    if (!user.isPremium) {
      user.freeGenerationsUsed += 1;
      await user.save();
    }

    res.json({
      ...result,
      freeGenerationsUsed: user.freeGenerationsUsed,
      freeGenerationsLimit: user.freeGenerationsLimit,
      isPremium: user.isPremium
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Generation error', error: err.message });
  }
});

// @route   POST /api/timetable/save
// @desc    Save generated timetable
// @access  Private
router.post('/save', auth, async (req, res) => {
  try {
    const timetableData = {
      userId: req.user.id,
      ...req.body,
      status: 'saved'
    };

    const timetable = new Timetable(timetableData);
    await timetable.save();

    res.json({ success: true, message: 'Timetable saved successfully', timetable });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// @route   GET /api/timetable/history
// @desc    Get user's timetable history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const timetables = await Timetable.find({ userId: req.user.id, status: 'saved' })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ success: true, timetables });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/timetable/:id
// @desc    Get specific timetable
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ _id: req.params.id, userId: req.user.id });

    if (!timetable) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }

    res.json({ success: true, timetable });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

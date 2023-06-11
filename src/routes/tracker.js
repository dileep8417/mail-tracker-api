const router = require('express').Router();
const { getMailTracker } = require('../controllers/mailTracker')
const { getLinkClickTracker } = require('../controllers/linkClickTracker');

router.get('/mailTracking', getMailTracker);

router.get('/linkClickTracking', getLinkClickTracker);

module.exports = router;
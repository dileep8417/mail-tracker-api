const router = require('express').Router();
const { trackMail, trackLink, geTrackingStats } = require('../controllers/track');

router.get('/mail/:token', trackMail);

router.get('/link/:token', trackLink);

router.get('/stats', geTrackingStats);


module.exports = router;
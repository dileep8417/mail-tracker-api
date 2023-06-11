const { createOrUpdateTrackingStats, getValidTrackerFromToken, getValidTrackingStatsFromToken } = require('../services/trackingService');
const { isValidToken } = require('../utils');

const trackMail = async (req, res) => {    
    // Returns 400 HTTP status if token is not a valid ID
    const tracker = await getValidTrackerFromToken(req.params.token, 'mail');
    if (!tracker) {
        res.sendStatus(400);
        return;
    }

    
    // Create or update TrackingStats if user not unsubscribed
    await createOrUpdateTrackingStats(tracker, 'mail');
    
    // Lets user to download a dummy image
    res.download('./public/images/hidden.jpg');
}

const trackLink = async (req, res) => {
    // Returns 400 HTTP status if token is not a valid ID
    const tracker = await getValidTrackerFromToken(req.params.token, 'link');
    if (!tracker) {
        res.sendStatus(400);
        return;
    }
    
    // Create or update TrackingStats if user not unsubscribed
    await createOrUpdateTrackingStats(tracker, 'link');
    res.redirect(tracker.linkToTrack);
}

const geTrackingStats = async (req, res) => {
    /**
     * Link of type either mail or link 
     * parse and get token
     */
    const link = req.query.link;
    if (!link) {
        res.sendStatus(400);
        return;
    }

    const response = {};
    response.success = false;

    const linkArr = link.split('/');
    const token = linkArr[linkArr.length - 1];

    // Returns 400 HTTP status if token is not a valid ID
    if (!isValidToken(token)) {
        response.msg = 'Invalid link'
        res.status(400).json(response);
        return;
    }

    const trackingStats = await getValidTrackingStatsFromToken(token);

    response.success = true;
    response.stats = trackingStats;
    response.msg = trackingStats ? '' : 'Mail/Link not opened';
    res.json(response);
}

module.exports = {
    trackMail,
    trackLink,
    geTrackingStats
}
const TrackerModel = require('../models/tracker');
const TrackingStats = require('../models/trackingStats');

const getLinkClickTracker = async (req, res) => {
    const originalLink = req.query.link;
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;

    const response = {};
    response.success = false;

    if (!originalLink || !regex.test(originalLink)) {
        response.errorMsg = 'Invalid URL';
        res.status(400).send(response);
        return;
    }

    try {
        const tracker = await TrackerModel.create({
            trackerType: 'link',
            linkToTrack: originalLink
        });
        res.status(200);
        response.success = true;
        response.link = `${req.protocol}://${req.get('host')}/track/link/${tracker._id}`
    } catch (e) {
        res.status(400);
        response.errorMsg = e.message;
    }

    res.json(response);
}

module.exports = {
    getLinkClickTracker,
};
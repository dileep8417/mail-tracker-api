const TrackerModel = require('../models/tracker');

const getMailTracker = async (req, res) => {
    const response = {};
    try {
        const tracker = await TrackerModel.create({
            trackerType: 'mail',
        });

        res.status(200);
        response.success = true;
        response.link = `${req.protocol}://${req.get('host')}/track/mail/${tracker._id}`;
    } catch (e) {
        res.status(400);
        response.success = false;
        response.errorMsg = e.message;
    }

    res.send(response);
}

module.exports = {
    getMailTracker
};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackingStatsSchema = new Schema({
    tracker: {
        type: Schema.Types.ObjectId,
        ref: 'Tracker',
    },
    mailOpenedAt: String,
    mailLastOpenedAt: String,
    lastClickedAt: String,
    isLinkClicked: Boolean,
    trackCount: {
        type: Number,
        default: 0
    },
});

const TrackingStatsModel = mongoose.model('TrackingStats', trackingStatsSchema);

module.exports = TrackingStatsModel;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackingStatsSchema = new Schema({
    tracker: {
        type: Schema.Types.ObjectId,
        ref: 'Tracker',
    },
    mailOpenedAt: Date,
    mailLastOpenedAt: Date,
    lastClickedAt: Date,
    isLinkClicked: Boolean,
    trackCount: {
        type: Number,
        default: 0
    },
});

const TrackingStatsModel = mongoose.model('TrackingStats', trackingStatsSchema);

module.exports = TrackingStatsModel;
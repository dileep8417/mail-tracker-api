const { getCurrentDatTime } = require('../utils');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackerSchema = new Schema({
    trackerType: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
               return val === 'mail' || val === 'link';
            },
            message: "trackerType must be either 'mail' or 'link'"
        }
    },
    canTrack: {
        type: Boolean,
        default: true,
    },
    linkToTrack: String,
    createdAt: {
        type: String,
        default: getCurrentDatTime,
    },
    lastUpdatedAt: {
        type: String,
        default: getCurrentDatTime,
    },
    trackingStats: {
        type: Schema.Types.ObjectId,
        ref: 'TrackingStats'
    }
});

trackerSchema.pre('updateOne', function() {
    this.lastUpdatedAt = Date.now();
    next();
});

const TrackerModel = mongoose.model('Tracker', trackerSchema);

module.exports = TrackerModel;
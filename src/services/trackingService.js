const TrackingStatsModel = require('../models/trackingStats');
const TrackerModel = require('../models/tracker');
const { isValidToken } = require('../utils');

const getValidTrackerFromToken = async (token, trackerType = null) => {
    if (!isValidToken(token)) {
        return null;
    }

    const filter = {
        '_id': token
    };

    if (trackerType) {
        filter.trackerType = trackerType;
    }

    const tracker = await TrackerModel.findOne(filter).populate('trackingStats');
    if (!tracker) {
        return null;
    }

    return tracker;
}

const getValidTrackingStatsFromToken = async (token) => {
    const filter = {
        'tracker': token
    };

    const projection = {
        '_id': false,
        'tracker': false,
        '__v': false
    };

    const trackingStats = await TrackingStatsModel.findOne(filter, projection);
    if (!trackingStats) {
        return null;
    }

    return trackingStats;
}

const createOrUpdateTrackingStats = async (tracker) => {
    // Don't track stats if user unsubscribed
    if (!tracker.canTrack) {
        return;
    }
    
    let trackingStats = tracker.trackingStats;

    if (typeof trackingStats !== 'undefined') {
        // Updates existing object
        await updateTrackingStats(trackingStats);
        return;
    }
    
    // Creates new object
    trackingStats = await createTrackingStats(tracker);
    tracker.trackingStats = trackingStats;
    await tracker.save();
}

const createTrackingStats = (tracker) => {
    const currentDate = Date.now();
    const dataToInsert = {
        tracker: tracker
    };

    if (tracker.type !== 'mail') {
        dataToInsert.lastClickedAt = currentDate;
        dataToInsert.trackCount = 1;
    }

    return TrackingStatsModel.create(dataToInsert);
}

const updateTrackingStats = (trackingStats, trackerType) => {
    const currentDate = Date.now();

    trackingStats.trackCount += 1;
    if (trackerType === 'mail') {
        trackingStats.mailLastOpenedAt = currentDate;
    } else {
        trackingStats.lastClickedAt = currentDate;
    }
    
    return trackingStats.save();
}

module.exports = {
    getValidTrackerFromToken,
    createOrUpdateTrackingStats,
    getValidTrackingStatsFromToken
}
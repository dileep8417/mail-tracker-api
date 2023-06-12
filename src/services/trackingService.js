const TrackingStatsModel = require('../models/trackingStats');
const TrackerModel = require('../models/tracker');
const { isValidToken, getCurrentDatTime } = require('../utils');

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
        await updateTrackingStats(trackingStats, tracker.trackerType);
        return;
    }
    
    // Creates new object
    trackingStats = await createTrackingStats(tracker);
    tracker.trackingStats = trackingStats;
    await tracker.save();
}

const createTrackingStats = (tracker) => {
    const currentDate = getCurrentDatTime();
    const dataToInsert = {
        tracker: tracker
    };

    dataToInsert.trackCount = 1;
    if (tracker.trackerType === 'mail') {
        dataToInsert.mailOpenedAt = currentDate;
    } else {
        dataToInsert.lastClickedAt = currentDate;
    }

    return TrackingStatsModel.create(dataToInsert);
}

const updateTrackingStats = (trackingStats, trackerType) => {
    const currentDate = getCurrentDatTime();

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
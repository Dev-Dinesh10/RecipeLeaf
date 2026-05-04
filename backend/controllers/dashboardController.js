const grokService = require('../services/grokService');
const { successResponse } = require('../utils/responseHelper');

// In-memory cache for the daily dashboard
let dailyCache = {
  data: null,
  date: null
};

exports.getDashboard = async (req, res, next) => {
  try {
    const today = new Date().toDateString();

    // Check if we already have today's data cached
    if (dailyCache.date === today && dailyCache.data) {
      return successResponse(res, dailyCache.data, 'Dashboard data fetched from cache');
    }

    // Otherwise, generate new data via Grok
    const dashboardData = await grokService.generateDashboardData();
    
    // Update cache
    dailyCache.data = dashboardData;
    dailyCache.date = today;

    return successResponse(res, dashboardData, 'New AI dashboard data generated');
  } catch (error) {
    next(error);
  }
};

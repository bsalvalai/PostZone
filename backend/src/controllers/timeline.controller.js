const timelineService = require('../services/timeline.service.js');

const timeline = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;
    const posts = await timelineService.getTimeline(userId, limit, skip);

    return res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error("Error en el Controlador getTimeline: " + err);
    return res.status(500).json({ success: false, message: "Error obteniendo el timeline" });
  }
};

module.exports = {
  timeline
};

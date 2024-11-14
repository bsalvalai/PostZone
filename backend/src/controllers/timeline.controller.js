const timelineService = require('../services/timeline.service');

const timeline = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;

    const posts = await timelineService.getTimeline(userId, limit, skip);
    console.log("User ID:", req.user._id);

    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error en el controlador getTimeline: ", error);
    console.log("User ID:", req.user._id);
    console.log("User ID:", req.user.id);

    return res.status(500).json({ success: false, message: "Error obteniendo el timeline" });
  }
};

module.exports = {
  timeline
};

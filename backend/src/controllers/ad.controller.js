const adService = require('../services/ad.service.js');

const getAds = async (req, res) => {
  try {
    const ads = await adService.fetchAds();
    
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAds
};

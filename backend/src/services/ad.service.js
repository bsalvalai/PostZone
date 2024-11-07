const axios = require('axios');

class adService {

  async fetchAds() {  // Obtengo datos de propagandas desde el endpoint externo
    try {
      const response = await axios.get('https://my-json-server.typicode.com/chrismazzeo/advertising_da1/ads');
      return response.data;
    } catch (err) {
      console.error("Error en el Servicio fetchAds: ", err);
      throw new Error("Error en el Servicio fetchAds: " + err.message);
    }
  }

};

module.exports = new adService();

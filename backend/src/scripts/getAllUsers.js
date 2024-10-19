require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Configuro el csv-writer
const csvWriter = createCsvWriter({
  path: 'C:/Users/Usuario/Downloads/PostZone-users.csv',  // Ruta donde se guarda el .csv
  header: [
    { id: 'userId', title: 'User_ID' },
    { id: 'username', title: 'Username' },
    { id: 'email', title: 'Email' },
  ],
  fieldDelimiter: ';',  // Configuro el delimitador como un punto y coma para que Excel lo entienda
});

uri = `${process.env.DB_CONNECTION_STRING}`;

mongoose.connect(uri)
  .then(async () => {
    const users = await User.find({}).lean();  // Uso .lean() para obtener objetos JS en lugar de documentos Mongoose
    
    // Escribo los usuarios en el archivo .csv
    await csvWriter.writeRecords(users)
      .then(() => console.log("El archivo 'PostZone-users.csv' fue creado exitosamente."));

    mongoose.disconnect();
  })
  .catch(err => console.error(err));

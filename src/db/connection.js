const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectToDatabase = async (url) =>
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  connectToDatabase,
};

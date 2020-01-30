const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const bookRoutes = require('./server/routes/BookRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to this API'
}));

app.use('/api/v1/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

module.exports = app;
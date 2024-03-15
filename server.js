require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const auteurRoutes = require('./routes/auteur');
const editeurRoutes = require('./routes/editeur');
const livreRoutes = require('./routes/livre');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URL_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/user', userRoutes);
app.use('/auteur', auteurRoutes);
app.use('/editeur', editeurRoutes);
app.use('/livre', livreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

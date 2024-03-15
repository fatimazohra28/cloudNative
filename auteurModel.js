const mongoose = require('mongoose');

const auteurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    bio: { type: String }
});

const AuteurModel = mongoose.model('Auteur', auteurSchema);

module.exports = AuteurModel;

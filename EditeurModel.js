const mongoose = require('mongoose');

const editeurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    pays: { type: String }
});

const EditeurModel = mongoose.model('Editeur', editeurSchema);

module.exports = EditeurModel;

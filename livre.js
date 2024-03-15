const express = require('express');
const router = express.Router();
const LivreModel = require('../Models/LivreModel');

// Route pour ajouter un nouveau livre
router.post('/add', async (req, res) => {
    const { titre, auteur, editeur, categorie, anneePublication } = req.body;

    try {
        const livre = new LivreModel({ titre, auteur, editeur, categorie, anneePublication });
        const nouveauLivre = await livre.save();
        res.status(201).json(nouveauLivre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour mettre à jour un livre
router.put('/update/:id', async (req, res) => {
    const { titre, auteur, editeur, categorie, anneePublication } = req.body;

    try {
        const livre = await LivreModel.findById(req.params.id);
        if (!livre) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        livre.titre = titre;
        livre.auteur = auteur;
        livre.editeur = editeur;
        livre.categorie = categorie;
        livre.anneePublication = anneePublication;

        const livreModifie = await livre.save();
        res.json(livreModifie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer un livre
router.delete('/delete/:id', async (req, res) => {
    try {
        const livreSupprime = await LivreModel.findByIdAndDelete(req.params.id);
        if (!livreSupprime) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.json({ message: 'Livre supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

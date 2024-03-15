const express = require('express');
const router = express.Router();
const AuteurModel = require('../Models/auteursModel');

// Route pour obtenir tous les auteurs
router.get('/all', async (req, res) => {
    try {
        const auteurs = await AuteurModel.find();
        res.json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour obtenir les noms des auteurs
router.get('/names', async (req, res) => {
    try {
        const auteurs = await AuteurModel.find({}, 'nom');
        res.json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour ajouter un nouvel auteur
router.post('/add', async (req, res) => {
    const auteur = new AuteurModel({
        nom: req.body.nom,
        bio: req.body.bio
    });

    try {
        const newAuteur = await auteur.save();
        res.status(201).json(newAuteur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour mettre à jour un auteur
router.put('/update/:id', async (req, res) => {
    try {
        const auteur = await AuteurModel.findById(req.params.id);
        if (auteur == null) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }

        if (req.body.nom != null) {
            auteur.nom = req.body.nom;
        }

        if (req.body.bio != null) {
            auteur.bio = req.body.bio;
        }

        const updatedAuteur = await auteur.save();
        res.json(updatedAuteur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer un auteur
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedAuteur = await AuteurModel.findByIdAndDelete(req.params.id);
        if (deletedAuteur == null) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.json({ message: 'Auteur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

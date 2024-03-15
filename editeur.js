const express = require('express');
const router = express.Router();
const EditeurModel = require('../Models/EditeurModel');

// Route pour obtenir tous les éditeurs
router.get('/all', async (req, res) => {
    try {
        const editeurs = await EditeurModel.find();
        res.json(editeurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour obtenir les noms des éditeurs
router.get('/names', async (req, res) => {
    try {
        const editeurs = await EditeurModel.find({}, 'nom');
        res.json(editeurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour ajouter un nouvel éditeur
router.post('/add', async (req, res) => {
    const editeur = new EditeurModel({
        nom: req.body.nom,
        pays: req.body.pays
    });

    try {
        const newEditeur = await editeur.save();
        res.status(201).json(newEditeur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour mettre à jour un éditeur
router.put('/update/:id', async (req, res) => {
    try {
        const editeur = await EditeurModel.findById(req.params.id);
        if (editeur == null) {
            return res.status(404).json({ message: 'Éditeur non trouvé' });
        }

        if (req.body.nom != null) {
            editeur.nom = req.body.nom;
        }

        if (req.body.pays != null) {
            editeur.pays = req.body.pays;
        }

        const updatedEditeur = await editeur.save();
        res.json(updatedEditeur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer un éditeur
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedEditeur = await EditeurModel.findByIdAndDelete(req.params.id);
        if (deletedEditeur == null) {
            return res.status(404).json({ message: 'Éditeur non trouvé' });
        }
        res.json({ message: 'Éditeur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

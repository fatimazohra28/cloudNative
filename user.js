const express = require('express');
const router = express.Router();
const UserModel = require('../Models/UserModel');

// Route pour obtenir tous les utilisateurs
router.get('/all', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour obtenir les noms des utilisateurs
router.get('/names', async (req, res) => {
    try {
        const users = await UserModel.find({}, 'nom_complet');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour ajouter un nouvel utilisateur
router.post('/add', async (req, res) => {
    const user = new UserModel({
        email: req.body.email,
        nom_complet: req.body.nom_complet,
        username: req.body.username,
        mdp: req.body.mdp
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour mettre à jour un utilisateur
router.put('/update/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (req.body.email != null) {
            user.email = req.body.email;
        }

        // Mettre à jour d'autres champs ici...

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer un utilisateur
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (deletedUser == null) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

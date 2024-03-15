const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).send('Le token est obligatoire pour l’authentification');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Token invalide');
    }
};

module.exports = verifyToken;

const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const sauces = JSON.parse(req.body.sauce)
    const newSauce = new Sauce({
        ...sauces,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        userId: "62f136ee90b72c48bd3dff29",
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    newSauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch((error) => res.status(400).json({ error }))
}
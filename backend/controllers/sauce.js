const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    console.log(req.body);
    res.status(200).json('ok')
    const sauce = JSON.parse(req.body);
    const newSauce = new Sauce({
        ...sauce,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDislked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    newSauce.save()
        .then(() => res.status(201).json({ message: 'objet enregistré!' }))
        .catch((error) => res.status(400).json({ error }))
};
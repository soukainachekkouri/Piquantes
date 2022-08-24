const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const sauces = JSON.parse(req.body.sauce);
    const newSauce = new Sauce({
        ...sauces,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    console.log(req.body);
    newSauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch((error) => res.status(400).json({ error }))
}

exports.findSauces = (req, res, next) => {
    Sauce.find()
        .then(function(sauces) {
            console.log(sauces);
            res.status(200).json(sauces)
        })
        .catch(function(error) {
            console.log(error);
            res.status(400).json({ error })
        })
}

exports.findOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(function(sauce) {
            console.log(sauce);
            res.status(200).json(sauce)
        })
        .catch(error => res.status(400).json(error));
}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            console.log(sauce);
            console.log(sauceObject.userId);
            if (sauce.userId._id.toString() !== sauceObject.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'objet supprimé!' }))
        .catch(error => res.status(400).json({ error }));
}
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

exports.like = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.body.like === 1) {
                //= je like
                // je vérifie que l'utilisateur n'a pas déjà liké
                let index = sauce.usersLiked.indexOf(req.body.userId)
                    //id pas présente
                if (!index > -1) {
                    sauce.likes++
                        sauce.usersLiked.push(req.body.userId)
                }
            } else if (req.body.like === 0) {
                //id présente = on annule le like 
                let index = sauce.usersLiked.indexOf(req.body.userId)
                if (index > -1) {
                    if (sauce.likes > 0) {
                        sauce.likes--
                    }
                    sauce.usersLiked.splice(index, 1)
                }
            } else {
                //je dislike 
                if (sauce.likes > 0) {
                    sauce.likes--
                }

                let indexDislike = sauce.usersDisliked.indexOf(req.body.userId)
                if (!indexDislike > -1) {
                    sauce.dislikes++
                        sauce.usersDisliked.push(req.body.userId)
                }

                //Je vérifie s'il avait déjà liké 
                let index = sauce.usersLiked.indexOf(req.body.userId)
                if (index > -1) {
                    sauce.usersLiked.splice(req.body.userId)
                }
            }

            Sauce.updateOne({ _id: req.params.id }, sauce)
                .then(() => res.status(201).json({ message: 'Objet modifié' }))
                .catch(error => res.status(500).json({ error }))
        })
}
const Sauces= require('../models/sauces');
const fs = require('fs');

exports.CreateSauces=(req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
        const sauces = new Sauces({
            ...saucesObject,
            likes:0,
            dislikes:0,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        sauces.save()
          .then(() => res.status(201).json({ message: 'sauce créer!' }))
          .catch(error => res.status(400).json({ error }));
 
  };
exports.getAllSauces = (req, res, next) => {
    Sauces.find().then(
      (Sauces) => {
        res.status(200).json(Sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({
      _id: req.params.id
    }).then(
      (Sauces) => {
        res.status(200).json(Sauces);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  exports.modifySauces = (req, res, next) => {
    const saucesObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id ,usersLiked:[],usersDisliked:[],likes:0,dislikes:0})
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then(sauces => {
        const filename = sauces.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauces.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  exports.likeSauces = (req, res, next) => {
    if(req.body.like==1){
      Sauces.updateOne({ _id: req.params.id },{$push:{usersLiked:req.body.userId}})
      .then(() => { 
        Sauces.updateOne({ _id: req.params.id },{$inc:{likes:1}})
        .then(() => res.status(200).json({ message: 'j\'aime'}))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(400).json({ error }));
      
    }else if(req.body.like==-1){
      Sauces.updateOne({ _id: req.params.id },{$push:{usersDisliked:req.body.userId}})
      .then(() => {
        Sauces.updateOne({ _id: req.params.id },{$inc:{dislikes:1}})
        .then(() => res.status(200).json({ message: 'je n\'aime pas'} ))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(400).json({ error }));
    }else{
      Sauces.findOne({ _id: req.params.id})
        .then((sauces) => {
          console.log(sauces.usersLiked)
          if(sauces.usersLiked.indexOf(sauces.userId)!==-1){
            Sauces.updateOne({ _id: req.params.id },{$pull:{usersLiked:req.body.userId}})
            .then(() => {
            Sauces.updateOne({ _id: req.params.id },{$inc:{likes:-1}})
            .then(() => res.status(200).json({ message: 'je suis neutre'} ))
            .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(400).json({ error }));
          }else if(sauces.usersDisliked.indexOf(sauces.userId)!==-1){
            Sauces.updateOne({ _id: req.params.id },{$pull:{usersDisliked:req.body.userId}})
            .then(() => {
            Sauces.updateOne({ _id: req.params.id },{$inc:{dislikes:-1}})
            .then(() => res.status(200).json({ message: 'je suis neutre'} ))
            .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(400).json({ error }));
          }
    
      })
      .catch(error => res.status(400).json({ error }));
    
    }
    
      
  };
  
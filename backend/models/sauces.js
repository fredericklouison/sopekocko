const mongoose = require('mongoose');
const sauceSchema = mongoose.Schema({
    userId:{type:String,required:true},
    name:{ type: String, required: true },
    manufacturer:{ type: String, required: true },
    description:{ type: String, required: true },
    mainPepper:{ type: String, required: true },
    imageUrl:{ type: String, required: true },
    heat:{ type: String, required: true },
    likes:{ type: String},
    dislikes:{ type: String},
    usersLiked:{ type: [String]},
    usersDisliked:{ type: [String]}
});
module.exports = mongoose.model('Sauce', sauceSchema);
const mongoose = require('mongoose');
const Ad = require('../models/Ad');
const User = require('../models/User');


module.exports = {
    validateUser: async(req, res, next) =>{
        let { token, _id } = req.body;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.json({ return: { notAllowed: true } } );
        }

        const user = await User.findOne({ token });
        
        if(! await Ad.findById(_id).where('idUser').equals(user._id)){
            return res.json({ notAllowed: true});
        }

        next();
    }
}
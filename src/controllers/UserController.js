const { validationResult, matchedData } = require('express-validator');
const State = require('../models/State');
const User = require('../models/User');
const Ad = require('../models/Ad');
const Category = require('../models/Category');
const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');


module.exports = {
    getState: async (req, res) =>{
        let state = await State.find();
        return res.json({ state });
    },
    getInfo: async (req, res) =>{
        let { token } = req.query;
        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Ad.find({ idUser: user._id.toString() });

        let adList = [];

        for(let i in ads){
            const cat = await Category.findById(ads[i].category);
            adList.push({ ...ads[i]._doc, category: cat.slug });
        }

        let { name, email } = user;
        
        return res.json({
            name,
            email,
            state: state.name,
            ads: adList
        });
    },
    editAction: async (req, res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.json({ return: {
                error: errors.mapped()}
            });
        }

        const { name, token, password, state } = matchedData(req);

        let updates = {};

        if(name){
            updates.name = name;
        }
        if(state){
            if(mongoose.Types.ObjectId.isValid(state)){
                if(!await State.findById(state)){
                    return res.json({ return:{ error: 'Estado não encontrado' } });
                }
                updates.state = state;
            }else{
                return res.json({ return:{ error: 'Estado não encontrado' } });
            }
        }
        if(password){
            updates.passwordHash = await bcrypt.hash(password, 10);
        }

        await User.findOneAndUpdate({ token }, { $set: updates})

        return res.json({return: 'ok!'});
    }
}
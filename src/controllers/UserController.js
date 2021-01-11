const State = require('../models/State');
const User = require('../models/User');
const Ad = require('../models/Ad');
const Category = require('../models/Category');

module.exports = {
    getState: async (req, res) =>{
        let state = await State.find();
        res.json({ state });
    },
    getInfo: async (req, res) =>{
        let { token } = req.query;
        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Ad.find({idUser: user._id.toString()});

        let adList = [];

        for(let i in ads){
            const cat = await Category.findById(ads[i].category);
            adList.push({ ...ads[i], category: cat.slug });
        }

        let { name, email } = user;
        
        res.json({
            name,
            email,
            state: state.name,
            ads: adList
        });
    },
    editAction: async (req, res) =>{
        
    }
}
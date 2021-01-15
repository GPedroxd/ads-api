const mongoose = require('mongoose');
const Category = require('../models/Category');
const UserController = require('./UserController');
const { validationResult, matchedData } = require('express-validator');
const State = require('../models/State');
const User = require('../models/User');
const Ad = require('../models/Ad');
module.exports = {
    getCategories: async (req, res) =>{
        const cats = await Category.find();

        let categories = [];

        for(let i in cats){
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });
        }
        return res.json({ return: { categories } });
    },
    getItem: async (req, res) =>{
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.json({
                return: {
                    error: error.mapped()
                }
            });
        }

        let { idAd } = matchedData(req);

        if(!mongoose.Types.ObjectId.isValid(idAd)){
            return res.json({
                return: {
                    error: 'Anuncio não encontrado'
                }
            })
        };

        const ad = await Ad.findById(idAd);

        return res.json({
            return: {
                ad
            }
        })
    },
    getList: async (req, res) =>{

        const ads = await Ad.find().populate('idUser');
        return res.json({
            return: ads
        })
    },
    addAction: async (req, res) =>{
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.json({
                return: {
                    error: error.mapped()
                }
            });
        }

        let { token, title, price, priceNegotiable, description, state, category} = matchedData(req);

        if(!mongoose.Types.ObjectId.isValid(category)){
             return res.json({ return:{ error: 'Categoria não encontrada' } });
        };
        if(!await Category.findById(category) ){
            return res.json({ return:{ error: 'Categoria não encontrada' } });
        }
        if(!mongoose.Types.ObjectId.isValid(state)){
            return res.json({ return:{ error: 'Estado não encontrado' } });
        }
        if(! await State.findById(state)){
            return res.json({ return:{ error: 'Estado não encontrado' } });
        }

        const user = await User.findOne({ token });

        const ad = new Ad({
            idUser: user._id,
            title,
            price,
            priceNegotiable,
            description,
            state,
            category,
            views: 0,
            status: 'Ativo'
        });

        await ad.save();

        return res.json({
            return: ad
        });
    },
    editAction: async (req, res) =>{
        return res.json({
            return: {
                message: 'ok!'
            }
        })
    },
}
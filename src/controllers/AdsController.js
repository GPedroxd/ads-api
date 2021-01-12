const mongoose = require('mongoose');
const Category = require('../models/Category');
const categories = require('../models/Category');


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
        res.json({ return: { categories } });
    },
    getItem: async (req, res) =>{
        
    },
    getList: async (req, res) =>{
        
    },
    addAction: async (req, res) =>{
        
    },
    editAction: async (req, res) =>{
        
    },
}
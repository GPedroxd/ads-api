const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const User = require('../models/User');
const State = require('../models/State');

module.exports = {
    signin: async (req, res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.json({ return: {
                error: errors.mapped()}
            });
            return;
        }
        
        const data = matchedData(req);
        const user = await User.findOne({ email: data.email })

        if(!user){
            res.json({
                return: {
                    error: {email:{ message: 'E-mail e/ou senha inválidos'}}
                }
            }); 
            return;
        }
        if(!await bcrypt.compare(data.password, user.passwordHash)){
            res.json({
                return: {
                    error: {email:{ message: 'E-mail e/ou senha inválidos'}}
                }
            }); 
            return;
        }

        const payload = (Date.now + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;

        await user.save();

        let {email} = user;

        res.json({ return: {
            token,
            email
        }});

    },
    signup: async (req, res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.json({ return: {
                error: errors.mapped()}
            });
            return;
        }
        const data = matchedData(req);

        if(await User.findOne({ email: data.email })){
            res.json({
                return: {
                    error: {email:{ message: 'E-mail já cadastrado'}}
                }
            }); 
            return;
        }
        if(mongoose.Types.ObjectId.isValid(data.state)){
            if(!await State.findOne({ _id: data.state})){
                res.json({
                    return: { 
                        error: {state:{ message: 'Estado Não encontrado'}}
                    }        
                });
                return;
            }
        }else{
            res.json({
                return: { 
                    error: {state:{ message: 'codigo de estado inválido'}}
                }
            });
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10);
        const payload = (Date.now + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        let {name, email, state} = data;

        const newUser = new User({
            name,
            email,
            passwordHash,
            token,
            state
        });

        await newUser.save();

        res.json({ return: newUser});
    }
}
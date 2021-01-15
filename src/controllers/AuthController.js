const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const User = require('../models/User');
const State = require('../models/State');

module.exports = {
    signin: async (req, res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.json({ return: {
                error: errors.mapped()}
            });
        }
        
        const data = matchedData(req);
        const user = await User.findOne({ email: data.email })

        if(!user){
            return res.json({
                return: {
                    error: {message: 'E-mail e/ou senha inválidos'}
                }
            }); 
        }
        if(!await bcrypt.compare(data.password, user.passwordHash)){
            return res.json({
                return: {
                    error:  {message: 'E-mail e/ou senha inválidos'}
                }
            }); 
        }

        const payload = (Date.now + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;

        await user.save();

        let {email} = user;

        return res.json({ return: {
            token,
            email
        }});

    },
    signup: async (req, res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.json({ return: {
                error: errors.mapped()}
            });
        }
        const data = matchedData(req);

        if(await User.findOne({ email: data.email })){
            return res.json({
                return: {
                    error: {email:{ message: 'E-mail já cadastrado'}}
                }
            });
        }
        if(mongoose.Types.ObjectId.isValid(data.state)){
            if(!await State.findOne({ _id: data.state})){
                return res.json({
                    return: { 
                        error: {state:{ message: 'Estado Não encontrado'}}
                    }        
                });
            }
        }else{
            return res.json({
                return: { 
                    error: {state:{ message: 'codigo de estado inválido'}}
                }
            });
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

        return res.json({ return: newUser});
        
    }
}
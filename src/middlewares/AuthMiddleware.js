const User = require('../models/User');

module.exports = {
    private: async (req, res, next)=>{
        if(!req.body.token && !req.query.token){
            res.json({return: {notAllowed: true}});
            return;
        }
        let token = req.body.token ? req.body.token : req.query.token;
        if(token == ''){
            res.json({return: {notAllowed: true}});
            return;
        }
        if(!await User.findOne({token})){
            res.json({return: {notAllowed: true}});
            return;
        }
        next();
    }
}
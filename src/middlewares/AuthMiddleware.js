const User = require('../models/User');

module.exports = {
    private: async (req, res, next)=>{
        if(!req.body.token && !req.query.token){
            return res.json({return: {notAllowed: true}});
        }

        let token = req.body.token ? req.body.token : req.query.token;
        
        if(token == ''){
            return res.json({return: {notAllowed: true}});
        }
        if(!await User.findOne({token})){
            return res.json({return: {notAllowed: true}});
        }
        
        next();
    }
}
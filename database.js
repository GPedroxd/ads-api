const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.log("error: " + error);
});

module.exports = mongoose;
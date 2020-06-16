const mongoose = require('mongoose');

mongoose
    .connect(
        'mongodb://localhost:27017/zhealth',
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));;

mongoose.Promise = global.Promise;

module.exports = mongoose;
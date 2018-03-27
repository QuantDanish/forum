const mongoose  =   require('mongoose');

const keys  =   require('../config/keys');

mongoose.connect(keys.mongodb.url);


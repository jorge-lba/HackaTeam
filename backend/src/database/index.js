const mongoose = require( 'mongoose' )
require( 'dotenv/config' )

mongoose.Promise = global.Promise

mongoose.connect( process.env.DATABASE_URL ,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

module.exports = mongoose
const mongoose = require( 'mongoose' )
require( 'dotenv/config' )

console.log('databas',  process.env.DATABASE_URL )

mongoose.connect( process.env.DATABASE_URL ,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.Promise = global.Promise

module.exports = mongoose
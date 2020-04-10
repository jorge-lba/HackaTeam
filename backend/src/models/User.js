const mongoose = require( '../database/index.js' )

const UserSchema = new mongoose.Schema( {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    user: { type: String, required: true },
    participatedHackathons: { type: Number, default: 0 },
    skills: [ {
        name: { type: String, required: true },
        level: { type: Number, required: true },
        subdivision: [ { type: String } ]
    } ],
    states:[ { type: String } ]
} )

const User = mongoose.model( 'User', UserSchema )

module.exports = User
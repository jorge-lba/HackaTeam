const mongoose = require( '../database/index.js' )

const TeamSchema = new mongoose.Schema( {
    teamNumber: { type: Number, default: 1, unique: true },
    name: { type: String, required: true, unique: true },
    members: [ {
        leader: { type: Boolean, default: false },
        user: { type: Object }
    } ]
} )

const Team = mongoose.model( 'Team', TeamSchema )

module.exports = Team
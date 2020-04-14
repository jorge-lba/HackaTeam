const mongoose = require( '../database/index.js' )

const ManagementSchema = new mongoose.Schema( {
    
    teamId: { type: String, required: true },
    requestsInitialized: [{
        dateInit: { type: Date, default: Date.now() },
        userIdInvited: { type: String },
        userIdWasInvited: { type: String },
        dateEnd: { type: Date }
    }],
    requestsClosed: [{
        dateInit: { type: Date },
        userIdInvited: { type: String },
        userIsWasInvited: { type: String },
        dateEnd: { type: Date, default: Date.now() }
    }],

} )

const Management = mongoose.model( 'Management', ManagementSchema )
module.exports = Management
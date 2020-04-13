const mongoose = require( '../database/index.js' )

const ManagementSchema = new mongoose.Schema( {
    
    teamId: { type: String, required: true },
    requestsInitialized: [{
        dateInit: { type: Date, default: Date.now() },
        userIdInvited: { type: String, required: true },
        userIsWasInvited: { type: String, required: true },
        dateEnd: { type: Date }
    }],
    requestsClosed: [{
        dateInit: { type: Date },
        userIdInvited: { type: String, required: true },
        userIsWasInvited: { type: String, required: true },
        dateEnd: { type: Date, default: Date.now() }
    }],

}, { _id: false } )
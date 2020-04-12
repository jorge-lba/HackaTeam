const Team = require( '../models/Team.js' )
const User = require( '../models/User.js' )
require( 'dotenv/config' )

module.exports = {
    async create( request, response ){

        try {
            
            const user = await User.findById( request.body.userId )
            const teams = await Team.find()
            console.log( teams.length )

            const team = await Team.create( {
                teamNumber: (teams.length+1) ,
                name: request.body.name,
                members: [ {
                    leader: true,
                    user
                } ]
            })
            console.log( team )
            response.status( 200 ).json( team )

        } catch (error) {
            response.status( 400 ).json( { error } )
        }

    }
}
const Management = require( '../models/Management.js' )
const User = require( '../models/User.js' )
const Team = require( '../models/Team.js' )

module.exports = {

    async create( request, response ){
        
        try {
            
            const { teamId, userIdInvited, userIdWasInvited } = request.body
            const dataUsers = await User.find()
            
            const userInvited = dataUsers.find( user => user._id == userIdInvited )
            const userWasInvited = dataUsers.find( user => user._id == userIdWasInvited )
            const team = await Team.findById( teamId )

            if( userInvited && userWasInvited && team ){
                await Management.create( { 
                    requestsInitialized: [{ userIdInvited, userIdWasInvited }],
                    teamId: team.id
                } )

                response.status( 200 ).json( { message: 'Seu convite foi enviado' } )
            }

        } catch (error) {
            response.status( 400 ).json( {error} )
        }

    }

}
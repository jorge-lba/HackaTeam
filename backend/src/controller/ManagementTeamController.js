const Management = require( '../models/Management.js' )
const User = require( '../models/User.js' )
const Team = require( '../models/Team.js' )

module.exports = {

    async invitation( request, response ){
        
        try {
            
            const { userIdInvited, userIdWasInvited } = request.body
            const teamId = request.params.id
            const dataUsers = await User.find()
            
            const userInvited = dataUsers.find( user => user._id == userIdInvited )
            const userWasInvited = dataUsers.find( user => user._id == userIdWasInvited )
            const team = await Team.findById( teamId )
            const [management] = await Management.find( { teamId } )
            management.requestsInitialized.push( { userIdInvited, userIdWasInvited } )

            if( userInvited && userWasInvited && team ){
                await Management.findByIdAndUpdate( management._id , management )

                response.status( 200 ).json( { message: 'Seu convite foi enviado' } )
            }

        } catch (error) {
            response.status( 400 ).json( {error} )
        }

    }

}
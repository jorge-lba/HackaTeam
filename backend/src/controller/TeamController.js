const Team = require( '../models/Team.js' )
const User = require( '../models/User.js' )
require( 'dotenv/config' )

module.exports = {

    async index( request, response ){

        try {
            
            let teams = await Team.find()
            
            response.status( 200 ).json( teams )

        } catch (error) {
            response.status( 400 ).json( error )
        }

    },

    async create( request, response ){

        try {
            
            const user = await User.findById( request.body.userId )
            const teams = await Team.find()

            const team = await Team.create( {
                teamNumber: (teams.length+1) ,
                name: request.body.name,
                members: [ {
                    leader: true,
                    user
                } ]
            })
            response.status( 200 ).json( team )

        } catch (error) {
            response.status( 400 ).json( { error } )
        }

    },

    async delete( request, response ){

        try {
            
            const team = await Team.findById( request.params.id )
            const leader = team.members.find( member => member.leader === true )
            
            if(team && leader.user._id == request.header( 'Authorization' )){
                await Team.findByIdAndDelete( request.params.id )
                response.status(200).json( { message: 'Time deletado com sucesso.' } )

            }else{
                response.status( 400 ).json( { error: 'Usuario não é lider do time' } )
            }

        } catch (error) {
            response.status( 400 ).json( { error } )
        }

    }
}
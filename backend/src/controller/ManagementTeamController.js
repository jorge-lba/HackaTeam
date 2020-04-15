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

    },

    async cancel( request, response ){

        try {
            const data = {
                requestsInitialized: [],
                requestsClosed: []
            } 
            
            const teamId = request.params.id
            const { userIdInvited, userIdWasInvited } = request.body
            const [management] = await Management.find( { teamId } )
            
            data.requestsInitialized = management.requestsInitialized.filter( element => {
                if( element.userIdInvited !== userIdInvited || element.userIdWasInvited !== userIdWasInvited ){
                    return true
                }
                const elementNew = Object.assign( {}, element.toJSON() )
                elementNew.dateEnd = Date.now()
                elementNew.state = "canceled"
                data.requestsClosed.push( elementNew )
                return false
            } )

            management.requestsInitialized = data.requestsInitialized
            management.requestsClosed = data.requestsClosed.concat( management.requestsClosed )

            await Management.findOneAndUpdate( { teamId }, management )
    
            response.status( 200 ).json( { message: 'Convite cancelado.' } )

        } catch (error) {
            response.status( 400 ).json( { error } )
        }

    },

    async accept( request, response ){

        try {
            const data = {
                requestsInitialized: [],
                requestsClosed: []
            } 
            
            const { userIdInvited, userLeader } = request.body
            const teamId = request.params.id

            const management = await Management.findOne( { teamId } )
        
            data.requestsInitialized = management.requestsInitialized.filter( element => {
                if( element.userIdWasInvited !== userLeader || element.userIdInvited !== userIdInvited ){
                    return true
                }
                const elementNew = Object.assign( {}, element.toJSON() )
                elementNew.dateEnd = Date.now()
                elementNew.state = "accept"
                data.requestsClosed.push( elementNew )
                return false
            } )

            management.requestsInitialized = data.requestsInitialized
            management.requestsClosed = data.requestsClosed.concat( management.requestsClosed )

            await Management.findOneAndUpdate( { teamId }, management )

            response.status( 200 ).json( { message: 'Solicitação de entrada aceita.' })    

        } catch (error) {
            response.status( 400 ).json( { error } )
        }

    },

    async refuse( request, response ){

        try {
            const data = {
                requestsInitialized: [],
                requestsClosed: []
            } 
            
            const { userIdInvited, userLeader } = request.body
            const teamId = request.params.id

            const management = await Management.findOne( { teamId } )
        
            data.requestsInitialized = management.requestsInitialized.filter( element => {
                if( element.userIdWasInvited !== userLeader || element.userIdInvited !== userIdInvited ){
                    return true
                }
                const elementNew = Object.assign( {}, element.toJSON() )
                elementNew.dateEnd = Date.now()
                elementNew.state = "refuse"
                data.requestsClosed.push( elementNew )
                return false
            } )

            management.requestsInitialized = data.requestsInitialized
            management.requestsClosed = data.requestsClosed.concat( management.requestsClosed )

            await Management.findOneAndUpdate( { teamId }, management )

            response.status( 200 ).json( { message: 'Solicitação de entrada recusada.' })    

        } catch (error) {
            response.status( 400 ).json( { error } )
        }

    },

}
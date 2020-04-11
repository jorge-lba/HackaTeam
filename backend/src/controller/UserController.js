const User = require( '../models/User.js' )
require( 'dotenv/config' )

module.exports = {

    async index( request, response ){

        try {
            
            const users = await User.find()
            response.status( 200 ).json( {
                message: 'Usuários cadastrados',
                users
            } )

        } catch (error) {
            response.status( 400 ).json( { error } )
        }

    } ,

    async create( request, response ){

        try {
            const user = await User.create( request.body )
            response.status( 200 ).json( {
                message: 'Usuário criado com sucesso.',
                id: user.id
            } )     
        } catch (error) {
            response.status( 400 ).json( { error } )
        }
    },

    async delete( request, response ){
        const user = request.header('user')
        const password = request.header('password')

        try {
            if( user === process.env.USER_MASTER && password === process.env.USER_MASTER_PASSWORD ){
                await User.findByIdAndRemove( request.params.id )
                response.status( 200 ).json( { message: 'Usuário deletado com sucesso.' } )
            }else{
                response.status( 400 ).json( { error: 'ADMIN - Usuário ou Senha incorreto' } )
            }
        } catch (error) {
            response.status( 400 ),json( { error } )
        }

    }
}
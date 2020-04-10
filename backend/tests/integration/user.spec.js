const request  = require( 'supertest' )
const app = require( '../../src/app.js' )
const mongoose = require( 'mongoose' )

require('dotenv/config')

const data = {}

describe( "USER_DELETE", () => {

    it( "Deve delatar um usuário", async () => {

        afterAll( async () => await mongoose.connection.close() )

        const response = await request( app )
            .delete( `/users/${ data.id }` )
            .set( 'user', process.env.USER_MASTER )
            .set( 'authorization', process.env.USER_MASTER_PASSWORD )

        expect( response ).toHaveProperty( 'message', 'Usuário deletado com sucesso' )

    } )

} )
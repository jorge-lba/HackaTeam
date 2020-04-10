const request  = require( 'supertest' )
const app = require( '../../src/app.js' )
const mongoose = require( 'mongoose' )

require('dotenv/config')

const data = {
    email: 'test@test.com',
    password: 'test123456',
    name: 'Test Jest',
    user: '@testjest',
    participatedHackathons: 2,
    skills: [ {
        name: 'Dev',
        level: 3,
        subdivision: [ 'NodeJS', 'ReactJS', 'ReactNative' ]
    }, {
        name: 'UX',
        level: 1,
        subdivision: [ 'Photoshop', 'MarvelApp' ]
    } ]
}

describe( "USER_CREATE", () => {

    it( "Deve criar um usuário.", async () => {

        const response = await request( app )
            .post( '/user' )
            .send( data )
   
        expect( response ).toHaveProperty( 'message', 'Usuário criado com sucesso.' )
        expect( response ).toHaveProperty( 'id' )
        data.id = response.id
    } )

} )

describe( "USER_DELETE", () => {

    it( "Deve delatar um usuário.", async () => {

        afterAll( async () => await mongoose.connection.close() )

        const response = await request( app )
            .delete( `/users/${ data.id }` )
            .set( 'user', process.env.USER_MASTER )
            .set( 'authorization', process.env.USER_MASTER_PASSWORD )

        expect( response ).toHaveProperty( 'message', 'Usuário deletado com sucesso.' )

    } )

} )
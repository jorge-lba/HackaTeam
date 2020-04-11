const request  = require( 'supertest' )
const app = require( '../../src/app.js' )
const mongoose = require( 'mongoose' )

require( 'dotenv/config' )

jest.setTimeout( 40000 )

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
            .post( '/users' )
            .send( data )
   
        expect( response.body ).toHaveProperty( 'message', 'Usuário criado com sucesso.' )
        expect( response.body ).toHaveProperty( 'id' )
        data.id = response.body.id
    } )

} )

describe( "USER_GET", () => {

    it( "Deve retornar o usuário cadastrado", async () => {

        const dataKeys = Object.keys( data )
        const respose = await request( app )
            .get( '/users' )

        const [ user ] = respose.body
        console.log( user )
        dataKeys.forEach( key => {
            expect( user ).toHaveProperty( key, data[ key ] )
        } )

    } )

} )

describe( "USER_DELETE", () => {

    it( "Deve delatar um usuário.", async () => {

        afterAll( async () => await mongoose.connection.close() )

        const response = await request( app )
            .delete( `/users/${ data.id }` )
            .set( {user: process.env.USER_MASTER, password: process.env.USER_MASTER_PASSWORD } )

        expect( response.body ).toHaveProperty( 'message', 'Usuário deletado com sucesso.' )

    } )

} )
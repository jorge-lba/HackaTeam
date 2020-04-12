const request  = require( 'supertest' )
const app = require( '../../src/app.js' )
const mongoose = require( '../../src/database/index.js' )

jest.setTimeout( 40000 )

const dataUser = {
    email: 'leader@test.com',
    password: 'test123456',
    name: 'Test Jest',
    user: '@leadertestjest',
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

const dataTeam = {
    name: 'JEST TEAM'
}

describe( "TEAM_CREATE", () => {
    
    it( "Deve criar um usuário.", async () => {

        const response = await request( app )
            .post( '/users' )
            .send( dataUser )
   
        expect( response.body ).toHaveProperty( 'message', 'Usuário criado com sucesso.' )
        expect( response.body ).toHaveProperty( 'id' )
        dataUser._id = response.body.id
    } )

    it( "Deve criar um time", async () => {

        const response = await request( app )
            .post( '/teams' )
            .send( { userId: dataUser._id, name: dataTeam.name } )
        
        expect( response.body ).toHaveProperty( 'teamNumber', 1 )
        expect( response.body ).toHaveProperty( 'name', dataTeam.name )
        expect( response.body ).toHaveProperty( '_id' )
        expect( response.body ).toHaveProperty( 'members' )

        dataTeam = { ...response.body }

    } )

} )

describe( "TEAM_DELETE", () => {

    it( "Deve delatar um usuário.", async ( ) => {

        const response = await request( app )
            .delete( `/users/${ dataUser._id }` )
            .set( {user: process.env.USER_MASTER, password: process.env.USER_MASTER_PASSWORD } )

        expect( response.body ).toHaveProperty( 'message', 'Usuário deletado com sucesso.' )

    } )

    it( "Deve deletar o Time.", async () => {

        const response = await request( app )
            .delete( `/teams/${ dataTeam._id }` )
            .set( 'Authorization', dataUser._id )

        expect( response.body ).toHaveProperty( 'message', 'Time deletado com sucesso.' )

    } )

} )
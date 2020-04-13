const request  = require( 'supertest' )
const app = require( '../../src/app.js' )

jest.setTimeout( 40000 )

const usersAutoCreate = async ( amount ) => {
    const users = []
    for( let i = 1; i <= amount; i++ ){
        const data = {
            email: `test${i}@test.com`,
            password: 'test123456',
            name: `Test${i} Jest`,
            user: `@testjest${i}`,
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

        const response = await request( app )
            .post( '/users' )
            .send( data )
        data.id = response.body.id
        
        users.push( data )
    }

    return users
}

const usersAutoDelete = ( users ) => {

}

describe( "TEAM_MENAGEMENT_INVITE", () => {

    it( 'Deve criar 5 usuarios', async () => {
        const response = await usersAutoCreate(5)
        console.log( response )
    } )

} )
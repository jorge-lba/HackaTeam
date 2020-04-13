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

const usersAutoDelete = async ( users ) => {

    users.forEach( async user => 
        await request( app )
            .delete( `/users/${ user._id }` )
            .set( {user: process.env.USER_MASTER, password: process.env.USER_MASTER_PASSWORD } )    
    )

}

describe( "TEAM_MENAGEMENT_INVITE", () => {

    const data = {}

    it( "Deve criar 5 usuários", async () => {
        data.users = await usersAutoCreate( 5 )
    })

    it( "O primeiro usuário deve criar um time", async () => {
        data.team = await request( app )
            .post( '/teams' )
            .send( { userId: data.users[0]._id, name: data.users[0].name } )
    } )

    it( "Deve convidar o segundo usuário para o time", async () => {

        const response = await request( app )
            .post( '/management' )
            .send( { teamId: data.team._id, userLeaderId: data.users[0]._id, userInviteId: data.users[1]._id } )

        expect( response.body ).toHaveProperty( 'message', 'Seu convite foi enviado' )

    } )

} )
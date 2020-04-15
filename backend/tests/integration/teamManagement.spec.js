const request  = require( 'supertest' )
const app = require( '../../src/app.js' )

const Management = require( '../../src/models/Management.js' )

require( 'dotenv/config' )

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

    users.forEach( async user => {
        await request( app )
            .delete( `/users/${ user.id }` )
            .set( {user: process.env.USER_MASTER, password: process.env.USER_MASTER_PASSWORD } )    
    })
}

const data = {}

describe( "TEAM_MANAGEMENT_INVITE", () => {


    it( "Deve criar 5 usuários", async () => {
        data.users = await usersAutoCreate( 5 )
    })

    it( "O primeiro usuário deve criar um time", async () => {
        const team = await request( app )
            .post( '/teams' )
            .send( { userId: data.users[0].id, name: data.users[0].name } )

        data.team = team.body
    } )

    it( "Deve convidar o segundo usuário para o time", async () => {
        
        const response = await request( app )
            .put( `/management/team/${data.team._id}` )
            .send( { userIdInvited: data.users[0].id, userIdWasInvited: data.users[1].id } )
            
            
            expect( response.body ).toHaveProperty( 'message', 'Seu convite foi enviado' )
            
    } )

    it( "Deve convidar o terceiro usuário para o time", async () => {
        
        const response = await request( app )
            .put( `/management/team/${data.team._id}` )
            .send( { userIdInvited: data.users[0].id, userIdWasInvited: data.users[2].id } )
            
        expect( response.body ).toHaveProperty( 'message', 'Seu convite foi enviado' )
            
    } )
        
} )

describe( "TEAM_MANAGEMENT_CANCEL", () => {

    it( "Deve cancelar convite ", async () => {

        const response = await request( app )
            .delete( `/management/team/${data.team._id}` )
            .send( { userIdInvited: data.users[0].id, userIdWasInvited: data.users[2].id } )

        expect( response.body ).toHaveProperty( 'message', 'Convite cancelado.' )

    } )

} )

describe( "TEAM_MANAGEMENT_ACCEPT", () => {

    it( "Adiciona uma solicitação de entrada no time.", async () => {

        const dataNew = {
            userIdInvited: data.users[3].id,
            userIdWasInvited: data.users[0].id
        }

        await Management.findOneAndUpdate( { teamId: data.team._id }, {
            $push: { requestsInitialized: dataNew }
        } )
    } )

    it( "Deve aceitar a solicitação de entrada do usuário 4.", async () => {

        const response = await request( app )
            .put( `/management/team/${data.team._id}/accept` )
            .send( { userLeader: data.users[0].id, userIdInvited: data.users[3].id } )

        expect( response.body ).toHaveProperty( 'message', 'Solicitação de entrada aceita.' )

    } )

} )

describe( "TEAM_MANAGEMENT_REFUSE", () => {

    it( "Adiciona uma solicitação de entrada no time.", async () => {

        const dataNew = {
            userIdInvited: data.users[4].id,
            userIdWasInvited: data.users[0].id
        }

        await Management.findOneAndUpdate( { teamId: data.team._id }, {
            $push: { requestsInitialized: dataNew }
        } )
    } )

    it( "Deve aceitar a solicitação de entrada do usuário 5.", async () => {

        const response = await request( app )
            .put( `/management/team/${data.team._id}/refuse` )
            .send( { userLeader: data.users[0].id, userIdInvited: data.users[4].id } )

        expect( response.body ).toHaveProperty( 'message', 'Solicitação de entrada recusada.' )

    } )


    it( "Deve deletar dos 5 usuários criados", async () => {
        await usersAutoDelete( data.users )
    } )

} )

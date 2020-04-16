const request = require( 'supertest' )
const app = require( '../../src/app.js' )
const mongoose = require( '../../src/database/index.js' )

const Management = require( '../../src/models/Management.js' )

jest.setTimeout( 40000 )

/**
 * Criar Usuarios 
 * Criar Time
 * Leader Do time Convida o Usuario [1]
 * Usuaria [1] aceita
 * Leader Do Time Convida o Usuario [2]
 * Usuario [2] rejeita
 * Usuario [3] solicita entrada no time
 * Leader do time Aceita
 * Usuário [4] Solicita entrada no time
 * Usuario [4] Cancela solicitação
 * Deletar Ususarios
 * Deletar Time
 */

 const usersAutoCreate = require( '../utils/addUsers.js' )
 const usersAutoDelete = require( '../utils/usersDelete.js' )

 const data = {}

 const leaderSendIvitation = async ( userLeader, userInvit, team ) => 
    await request( app )
        .put( `/management/team/${team._id}` )
        .send( { userIdInvited: userLeader, userIdWasInvited: userInvit} )

 const userSendSolicitation = async ( userLeader, userInvit, team ) => 
    await request( app )
        .put( `/management/user/${team._id}` )
        .send( { userIdWasInvited: userLeader, userIdInvited: userInvit} )

 describe( "INIT", () => {

    it( "Deve criar cinco usuários.", async () => {
        data.users = await usersAutoCreate( 5, 'user' )
        expect( data.users.length ).toBe( 5 )
    } )
    it( "O primeiro usuário deve criar um time", async () => {
        const team = await request( app )
            .post( '/teams' )
            .send( { userId: data.users[0].id, name: data.users[0].name+'test' } )

        data.team = team.body
    } )
 } )

 describe( "LEADER_INVIT_USER_1", () => {
    it( "O lider deve enviar um convite e o usuário aceitar", async () => {
        const response = await leaderSendIvitation( data.users[0].id, data.users[1].id, data.team )

        expect( response.body ).toHaveProperty( 'message', 'Seu convite foi enviado' )
    } )

    it( "O usuário 1 deve aceitar o convite", async () => {
        const response = await request( app )
            .put( `/management/user/${data.team._id}/accept` )
            .send( { userIdInvited: data.users[0].id, userIdWasInvited: data.users[1].id} )
        
        expect( response.body ).toHaveProperty( 'message', 'Você entrou para o time.' )
    } )
 } )

 describe( "LEADER_INVIT_USER_2", () => {
    it( "O lider deve enviar um convite e o usuário aceitar", async () => {
        const response = await leaderSendIvitation( data.users[0].id, data.users[2].id, data.team )

        expect( response.body ).toHaveProperty( 'message', 'Seu convite foi enviado' )
    } )

    it( "O usuário 2 deve aceitar o convite", async () => {
        const response = await request( app )
            .put( `/management/user/${data.team._id}/reject` )
            .send( { userIdInvited: data.users[2].id, userIdWasInvited: data.users[0].id} )
        
        expect( response.body ).toHaveProperty( 'message', 'Você recusou o convite.' )
    } )
 } )

 describe( "USER_3_SEND_SOLICITATION", () => {
    it( "Usuário 3 deve solicitar entrada no time", async () => {
        const response = await userSendSolicitation( data.users[0].id, data.users[3].id, data.team )

        expect( response.body ).toHaveProperty( 'message', 'Sua solicitação foi enviada.' )
    } )

    it( "O time deve aceitar a solicitação", async () => {
        const response = await request( app )
            .put( `/management/team/${data.team._id}/accept` )
            .send( { userLeader: data.users[0].id, userIdInvited: data.users[3].id } )

        expect( response.body ).toHaveProperty( 'message', 'Solicitação de entrada aceita.' )
    } )
 } )

 describe( "USER_4_SEND_SOLICITATION", () => {
    it( "Usuário 4 deve solicitar entrada no time", async () => {
        const response = await userSendSolicitation( data.users[0].id, data.users[4].id, data.team )

        expect( response.body ).toHaveProperty( 'message', 'Sua solicitação foi enviada.' )
    } )

    it( "Usuário 4 deve cancelar a solicitação", async () => {
        const response = await request( app )
            .put( `/management/user/${team._id}/cancel` )
            .send( { userIdInvited: data.users[4].id, userIdWasInvited: data.users[0].id} )

        expect( response.body ).toHaveProperty( 'message', 'Sua solicitação foi cancelada.' )
    } )
 } )

 describe( "END", () => {
    it( "Deve deletar o Time.", async () => {

        const response = await request( app )
            .delete( `/teams/${ data.team._id }` )
            .set( 'Authorization', data.users[0].id )

        expect( response.body ).toHaveProperty( 'message', 'Time deletado com sucesso.' )

    } )

    it( "Deve deletar todos os usuários.", async () => {
        const response = await usersAutoDelete( data.users )
        expect( response ).toHaveProperty( 'message', 'Usuários deletados.' )
    } )
 } )
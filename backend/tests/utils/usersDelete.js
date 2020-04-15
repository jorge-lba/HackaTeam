const request = require( 'supertest' )
const app = require( '../../src/app.js' )

require( 'dotenv/config' )

module.exports = async ( users ) => {

    users.forEach( async user => {
        await request( app )
            .delete( `/users/${ user.id }` )
            .set( {user: process.env.USER_MASTER, password: process.env.USER_MASTER_PASSWORD } )    
    })
}
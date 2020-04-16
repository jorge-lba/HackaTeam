const request = require( 'supertest' )
const app = require( '../../src/app.js' )

module.exports = async ( amount, nameComplet = 'test' ) => {
    const users = []
    for( let i = 1; i <= amount; i++ ){
        const data = {
            email: `test${i}${nameComplet}@test.com`,
            password: 'test123456',
            name: `Test${i}${nameComplet} Jest`,
            user: `@testjest${i}${nameComplet}`,
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
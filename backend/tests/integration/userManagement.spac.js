const request = require( 'supertest' )
const app = require( '../../src/app.js' )

const Management = require( '../../src/models/Management.js' )

require( 'dotenv/config' )

jest.setTimeout( 40000 )


const express = require( 'express' )

const UserController = require( './controller/UserController.js' )
const TeamController = require( './controller/TeamController.js' )

const routes = express.Router()

routes.post( '/users', UserController.create )
routes.get( '/users', UserController.index )
routes.put( '/users/:id', UserController.update )
routes.delete( '/users/:id', UserController.delete )

routes.post( '/teams', TeamController.create )
routes.get( '/teams', TeamController.index )
routes.delete( '/teams/:id', TeamController.delete )

module.exports = routes
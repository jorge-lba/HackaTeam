const express = require( 'express' )

const UserController = require( './controller/UserController.js' )
const TeamController = require( './controller/TeamController.js' )
const ManagementController = require( './controller/ManagementTeamController.js' )

const routes = express.Router()

routes.post( '/users', UserController.create )
routes.get( '/users', UserController.index )
routes.put( '/users/:id', UserController.update )
routes.delete( '/users/:id', UserController.delete )

routes.post( '/teams', TeamController.create )
routes.get( '/teams', TeamController.index )
routes.put( '/teams/:id', TeamController.update )
routes.delete( '/teams/:id', TeamController.delete )

routes.put( '/management/team/:id', ManagementController.invitation )
routes.delete( '/management/team/:id', ManagementController.cancel )
routes.put( '/management/team/:id/accept', ManagementController.accept )
routes.put( '/management/team/:id/refuse', ManagementController.refuse )



module.exports = routes
const express = require( 'express' )

const UserController = require( './controller/UserController' )

const routes = express.Router()

routes.post( '/users', UserController.create )
routes.get( '/users', UserController.index )
routes.delete( '/users/:id', UserController.delete )

module.exports = routes
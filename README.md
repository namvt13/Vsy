# Vsy

New e-commerce project, inspired by [Etsy](https://www.etsy.com/), complete with both front-end (minified) and back-end part. Vsy is designed to be a mobile-first, single-page application, full-fledged e-commerce website. Live version is hosted on [Heroku](https://vsy.herokuapp.com). Technologies used:

- React on the front-end, completes with React-Router for navigation and Relay to fetch data from the server.
- Back-end supports https, register/login with account, facebook, twitter or google and.
- GraphQL server is hosted on [Graphcool](https://www.graph.cool/)
- Support fuse.js for simple product searching (to be implemented).
- Support socket.io for real-time support chat (to be implemented).
- Included part of GraphQL server and front-end Relay-enabled components.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See "Deployment" for notes on how to deploy the project on a live system.

### Prerequisites

Tested requirement (Best compatibility, you can use other platforms/applications if you wish):

```
- OS: Ubuntu 18.04
(Window & Mac OS can be used, too.
Paths are done using path.join(), so compatible should be good.
PM me for for any cross-platform related bugs.)

- Node.js: v8.15
- Editor: VSCode, lastest
- Chrome: Lastest
```

### Installing

- Clone the project
- Run either

```
yarn install
```

or

```
npm install
```

- Finally, at the base folder run

```
yarn/npm start
```

- Default port is 5050, you can change it in [config.json](server/config.json) or use the environment port like this:

```
// Run on port 4040
PORT=4040 yarn/npm start
```

- "config.json" contains info on authentication (removed here, you can add your own) key and secret as well as other configs.
- To enable authentication, uncomment the https server and comment out the http server like this: // image

### Tests

Not added yet! More updates in the future.

## Deployment

Deploy with Docker: coming...

## Built with

- [Express](https://github.com/expressjs/express)
- [GraphQL.js](https://github.com/graphql/graphql-js)
- [Relay](https://github.com/facebook/relay)
- [React](https://github.com/facebook/react)
- [Fuse.js](https://github.com/krisk/Fuse)
- [Socket.io](https://github.com/socketio/socket.io)

## Contributing

Please PM me directly for details

## Author

- **Me** - Initial work

## License

This project is licenced under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

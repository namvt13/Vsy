# Vsy
- Project descriptions...

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See "Deployment" for notes on how to deploy the project on a live system.

### Prerequisites

Tested requirement (Best compatibility, you can use other platforms/applications if you wish):
```
- OS: Linux
(Window & Mac OS can be used, too, as this is a small project.
Paths are all done using path.join(), so compatible should be good.
PM me for for any cross-platform related bugs.)

- Node.js: v8.15
- Editor: VSCode, lastest
- Chrome: Lastest
```
Other notes:
```
- This project contains both front-end and back-end, but the front-end part
had been minified to optimize delivery speed.
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
- Default port is 5050, you can change it in "config.json" or use the environment port like this:
```
// Run on port 4040
PORT=4040 yarn/npm start
```
- "config.json" contains info on authentication (removed here, you can add your own) key and secret as well as other configs.

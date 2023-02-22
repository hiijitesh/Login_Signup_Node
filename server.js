const http = require('http')
const app = require('./app')
const server = http.createServer(app)


const port = process.env.PORT || 8000



//server listening
server.listen(port, () => {
    console.log('server is running on the port http://localhost:' + port);
})


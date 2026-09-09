import http, {IncomingMessage, ServerResponse} from "http"

const PORT = 4000
const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {"content-type": "application/json"})
    res.end(JSON.stringify({message: "Creating server"})) //res.end closes the connection
}

const server = http.createServer(requestListener) //we create a new server instance and pass our function
    
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`)
})

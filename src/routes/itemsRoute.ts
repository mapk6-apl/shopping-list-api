import {IncomingMessage, ServerResponse} from 'http'
import {addItem, getItems, getItemById, updateItem, deleteItem} from '../controllers/itemController.js'

export const itemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
    if(req.url?.startsWith('/items')){
        console.log(req.url, 'request url'); //so we can see what the request url looks like

        //splitting the request url into parts(split after every "/")
        const parts = req.url.split("/") //returns an array in which every part/piece of the url is stored
        console.log(parts, 'url parts')

        const id = parts[2] ? parseInt(parts[2]) : undefined //convert id from string to integer if id is found

        //adding an item
        if (req.method === 'POST'){
            let body = ""
            req.on("data", (chunk) => { //chunk contains the piece of data that just arrived; .on is the standard way of listening for events on an object; data is the specific event that is being listened for
                body += chunk.toString(); //we convert chunk from a buffer(raw binary data) to a string
            })
        }

        //getting all items
        if(req.method === 'GET' && !id){
            res.writeHead(200, {"content-type": "application/json"});
            res.end(JSON.stringify(getItems)); //converts the array into JSON string; res.end signals end to request response
            return;
        }

    }
}

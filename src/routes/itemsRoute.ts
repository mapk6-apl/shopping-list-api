import {IncomingMessage, ServerResponse} from 'http'
import {addItem, getItems, getItemById, updateItem, deleteItem} from '../controllers/itemController.js'

export const itemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
    if(req.url?.startsWith('/items')){
        console.log(req.url, 'request url'); //so we can see what the request url looks like

        //splitting the request url into parts(split after every "/")
        const parts = req.url.split("/") //returns an array in which every part/piece of the url is stored
        console.log(parts, 'url parts')

        const id = parts[2] ? parseInt(parts[2]) : undefined //convert id from string to integer if id is found

        //adding an item (with error handling)
        if (req.method === 'POST'){
            let body = ""
            req.on("data", (chunk) => { //chunk contains the piece of data that just arrived; .on is the standard way of listening for events on an object; data is the specific event that is being listened for
                body += chunk.toString(); //we convert chunk from a buffer(raw binary data) to a string
            });
            req.on("end", () => {
                try { //code in here runs if there are no errors
                    const {name, category, quantity, notes} = JSON.parse(body);
                    if(!name || typeof name !== "string"){
                        res.writeHead(400, {"content-type": "application/json"})
                        res.end(JSON.stringify({error: "Item name is required"}))
                    }

                    if(!category || typeof category !== "string"){
                        res.writeHead(400, {"content-type": "application/json"})
                        res.end(JSON.stringify({error: "Item category is required"}))
                    }

                    if(!quantity || typeof quantity !== "number"){
                        res.writeHead(400, {"content-type": "application/json"})
                        res.end(JSON.stringify({error: "Item quantity is required"}))
                    }

                    if(!notes || typeof notes !== "string"){
                        res.writeHead(400, {"content-type": "application/json"})
                        res.end(JSON.stringify({error: "Item notes is required"}))
                    }

                    const newItem = addItem(name, category, quantity, notes);
                    res.writeHead(201, {"content-type": "application/json"})
                    res.end(JSON.stringify(newItem))

                } catch (error) { //if there are errors, they are handled in here
                    res.writeHead(400, {"content-type": "application/json"})
                    res.end(JSON.stringify({error: "Invalid JSON payload"}))
                }
                
            });
            return;
        }
         res.writeHead(405, {"content-type": "application/json"})
                    res.end(JSON.stringify({error: "Invalid JSON payload"}))
        

        //getting all items
        if(req.method === 'GET' && !id){
            res.writeHead(200, {"content-type": "application/json"});
            res.end(JSON.stringify(getItems())); //converts the array into JSON string; res.end signals end to request response
            return;
        }

        //getting item by id (with error handling)
        if(req.method === 'GET' && id){
            if(isNaN(id)) { //isNaN = is not a number
                res.writeHead(400, {'content-type' : 'application/json'}); //400 for bad input (ex. if id is not a number)
                res.end(JSON.stringify({error: "Invalid item Id"}));
                return;
            }
            const item = getItemById(id)
            if(!item){
                res.writeHead(404, {'content-type' : 'application/json'});
                res.end(JSON.stringify({error: "Item not found"}));
                return;
            }
            res.writeHead(200, {'content-type' : 'application/json'});
            res.end(JSON.stringify(item));
            return;
        }

        //updating item
        if(req.method === 'PUT' && id){
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const updatedFields = JSON.parse(body)
                const updatedItem = updateItem(id, updatedFields)
                res.writeHead(updatedItem ? 200 : 404, {'content-type' : 'application/json'});
                res.end(JSON.stringify(updatedItem || {message: "Item not found"}));
            });
            return;

        }

        //deleting item
        if(req.method === 'DELETE' && id){
            const deleteSuccess = deleteItem(id)
            
            if(deleteSuccess){
                res.writeHead(204, {"content-type":"application/json"})
                res.end(JSON.stringify({message: 'Item deleted successfully'}))
            }else {
                res.writeHead(404, {"content-type":"application/json"})
                res.end(JSON.stringify({message: 'Item not found'}))
            }

        }


    }
}

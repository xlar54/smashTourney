import dbConnector from "./dbConnector";
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

var router = express.Router(); 

dotenv.config(); //call the config method which will import our environment variables


const tourneyApp:Express = express(); //call the express default export function and assign the return value to our tourneyApp object

dotenv.config();

const port = process.env.PORT||3000; 

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });

    setTimeout(()=>testDB, 30000);
  });


function testDB ()
{
    tourneyApp.get ('/', async (req: Request, res: Response) => {
        try{
            const tourneydb:dbConnector = new dbConnector('postgres','superuser','localhost',5432,'tourneydb');
            const result = await tourneydb.query('Select * from fighters','');
            res.json(result.rows);
        } catch (err){
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        
    });
    
}  

tourneyApp.listen(port, () => {
    console.log(`Webserver is running at http://localhost:${port}`);
});

export default router; 




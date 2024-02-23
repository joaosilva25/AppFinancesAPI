import dotenv from 'dotenv';
import express,{Request,Response} from 'express';
import appRoutes from './routes/app';
import path from 'path';
import cors from 'cors'
import { mongoConnect } from './database/mongo';


dotenv.config()
mongoConnect()


const app = express()

app.use(cors())


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(appRoutes)


app.use((req:Request,res:Response) => {
    res.status(404)
    res.json({message:'Endpoint not found'})
})


app.listen(process.env.PORT)    
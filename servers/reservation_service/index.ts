import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors"
import routes from './src/routes/index';

const app = express()

app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


const port = 3004;


(async () => {
   // await initSequence();

    app.use('/',routes);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })

})();

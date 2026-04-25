import express from 'express';
import cors from 'cors';
import {StatusCodes} from "http-status-codes";

import serviceRoutes from "./api/service/service.routes.js"
import userRoutes from "./api/user/user.routes.js"
import categoryRoutes from "./api/category/category.routes.js"

//import DBService from "./services/db.service.js";

const PORT = 4001
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use('/user', userRoutes);
app.use('/service', serviceRoutes);
app.use('/category', categoryRoutes);

/*
async function initSeq(){
    await DBService.getInstance().connect();
    console.log("Database service initialized");
}
*/

(async () => {
    //await initSeq();
    app.listen(PORT, () => {
        console.log(`user_service listening on ${PORT}`);
    });
})();





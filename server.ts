import app from "./app";
import * as dotenv from "dotenv";
import { connect_db } from "./config/db";

dotenv.config();

const PORT = process.env.PORT! || 3000;
const CLIENT_URL = process.env.CLIENT_URL! || "http://localhost:";

app.listen(PORT, () => {
    console.log(`Server listening on ${CLIENT_URL}`);
    connect_db();
});

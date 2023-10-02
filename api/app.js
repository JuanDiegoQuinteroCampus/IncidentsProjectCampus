import express  from "express";
import cors from "cors";
import { loadEnv } from "vite";
import { appToken, appVerify, passport } from "./helpers/token.js";
import {appDiscord} from "./routers/discord.js";
import {appIncidents, appIncidentsV2} from "./routers/incidents.js";
import {appSupport, appSupportV2} from "./routers/support.js";
import {appUsers, appUsersV2} from "./routers/users.js";


const env = loadEnv("development", process.cwd(), 'VITE')



const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/login", appToken);

app.use("/discord", passport.authenticate('bearer', { session: false}) ,appVerify, appDiscord);

app.use("/incidents/v2",appIncidentsV2);
app.use("/incidents", passport.authenticate('bearer', { session: false}) ,appVerify, appIncidents);

app.use("/support/v2",appSupportV2);
app.use("/support", passport.authenticate('bearer', { session: false}) ,appVerify, appSupport);

app.use("/register/v2", appUsersV2);
app.use("/users", passport.authenticate('bearer', { session: false}) ,appVerify, appUsers);


const config={
    port: env.VITE_PORT_BACKEND,
    host: env.VITE_HOSTNAME
}
app.listen(config, ()=> {
    console.log(`http://${config.host}:${config.port}`);
})
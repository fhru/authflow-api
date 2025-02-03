import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import UserRoute from './routes/UserRoute.js'
import ProductRoute from './routes/ProductRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import sequelizeStore from 'connect-session-sequelize'
import db from './config/Database.js'

dotenv.config();

const app = express()

const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
    db: db
});

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))
app.use(express.json())
app.use(UserRoute)
app.use(ProductRoute)
app.use(AuthRoute)

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log(`Server UP and Running On Port ${process.env.APP_PORT}`);
})

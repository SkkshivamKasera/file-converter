import express from 'express'
import router from './router.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: './server/config.env' })

export const app = express()
app.use(express.json({
    limit: '100mb'
}))
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true
}))
app.use('/api/v1', router)
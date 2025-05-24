import express from 'express'
import './database/database.connection.js'
import {router as publicRoutes} from './routes/public.routes.js'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', publicRoutes)


app.listen(process.env.PORT, ()=> {
  console.log(`Server running on port: ${process.env.PORT}`);
})
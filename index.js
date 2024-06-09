import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'    
import cors from 'cors'
import userRoutes from './Routers/user.routes.js'
import projectRoutes from './Routers/project.routes.js'
import podcastRoutes from './Routers/podcast.routes.js'
import widgetRoutes from './Routers/widget.routes.js'
import connection from './Config/database.js'

const app = express()
const port = process.env.PORT || 8080
connection()

 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())  
app.use(userRoutes)
app.use(projectRoutes)
app.use(podcastRoutes)
app.use(widgetRoutes)










app.listen(port, () => console.log(`Server running on port ${port}`)) 
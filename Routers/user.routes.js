import express from 'express'
import { createUser, getUser, update } from '../Controller/user.controller.js'
import { tryCatch } from '../Middlewares/tryCatchMiddleware.js'
import { authMiddleware } from '../Middlewares/authMiddleware.js'
import { fileUpload, upload } from '../Middlewares/imageUpload.js'
const Router = express.Router()

Router.post('/api/user', tryCatch(createUser))
.patch('/api/user', authMiddleware,tryCatch(update))
.get('/api/user', authMiddleware,tryCatch(getUser))

export default Router 
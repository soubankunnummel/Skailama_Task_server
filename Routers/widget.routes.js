
import express from 'express'
import { authMiddleware } from '../Middlewares/authMiddleware.js'
import { tryCatch } from '../Middlewares/tryCatchMiddleware.js'
import { addDetails, createWidget, getWidget } from '../Controller/widget.controller.js'
import { fileUpload, upload } from '../Middlewares/imageUpload.js'

const Route = express.Router()

Route.post('/api/widget', upload.single('uploadedImage'),fileUpload,   authMiddleware,tryCatch(createWidget))
.get('/api/widget', authMiddleware,tryCatch(getWidget))
.post('/api/widget/details', authMiddleware,tryCatch(addDetails))
export default Route
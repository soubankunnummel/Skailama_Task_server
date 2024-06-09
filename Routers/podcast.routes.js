import express from 'express'
import { authMiddleware } from '../Middlewares/authMiddleware.js'
import { tryCatch } from '../Middlewares/tryCatchMiddleware.js'
import { creatPodcast, deletePodcast, editPodcast, getPodcastById } from '../Controller/podcast.controller.js'
const Router = express.Router()

Router.post('/api/podcast/:id', authMiddleware,tryCatch(creatPodcast) )
.patch('/api/podcast/:id', authMiddleware,tryCatch(editPodcast) )
.delete('/api/podcast/:id', authMiddleware,tryCatch(deletePodcast) )
.get('/api/podcast/:id', authMiddleware,tryCatch(getPodcastById) )

export default Router
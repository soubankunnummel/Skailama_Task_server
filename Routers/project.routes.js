import express from 'express'
import { createProject, getAllProjects, getProjectById } from '../Controller/project.controller.js'
import { tryCatch } from '../Middlewares/tryCatchMiddleware.js'
import { authMiddleware } from '../Middlewares/authMiddleware.js'
const Router =  express.Router()

Router.post('/api/project',authMiddleware , tryCatch(createProject))
.get('/api/project/:id', authMiddleware,tryCatch(getProjectById))
.get('/api/project', authMiddleware,tryCatch(getAllProjects))
export default Router
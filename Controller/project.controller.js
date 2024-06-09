import Project from "../Models/project.model.js";
import User from "../Models/user.model.js";


export const createProject = async (req, res) => {
    if(!req.body.title) return res.status(400).json({ message: "Title is required" });
    const { title } = req.body;
    const newProject = new Project({ title ,clientId: req.user._id});

    /// add project id into usercollection 

    const user = await User.findById(req.user._id); 
    user.projects.push(newProject._id);
    await user.save();


    await newProject.save();
    res.send(newProject);
}


// get projects by id & get podcasts

export const getProjectById = async (req, res) => {
    const project = await Project.findById(req.params.id).populate('podcast');
    if(!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
}


/// get aal projects

export const getAllProjects = async (req, res) => {
    const userId = req.user._id 
    const user = await User.findById(userId).populate('projects');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.projects);
}


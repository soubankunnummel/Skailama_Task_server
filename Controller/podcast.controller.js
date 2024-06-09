import Podcast from "../Models/podcast.model.js";
import Project from "../Models/project.model.js";


export const creatPodcast = async (req, res) => {
    if(!req.body.title || !req.body.description) return res.status(400).json({ message: "Title and description are required" });
    const {title, description} = req.body;
    const {id} = req.params;
    const newPodcast = new Podcast({title,  description});

    // add podcast id into project collection
    const project = await Project.findById(id);
    if(!project) return res.status(404).json({ message: "Project not found" });
    project.podcast.push(newPodcast._id);
    await project.save();
  

    // add project id into podcast collection
    newPodcast.project = project._id;
    newPodcast.save();
    res.status(201).json(newPodcast);
}



// edit podcast

export const editPodcast = async (req, res) => {
    const { id } = req.params;
    const podcast = await Podcast.findByIdAndUpdate(id, req.body, { new: true });

    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
     
    // podcast.description = description;
    podcast.save();
    res.status(200).json(podcast);
}

// delete podcast

export const deletePodcast = async (req, res) => {
    const { id } = req.params;
    const podcast = await Podcast.findByIdAndDelete(id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.status(200).json({ message: "Podcast deleted successfully" });
}



// get all podcast

export const getAllPodcast = async (req, res) => {
    const podcast = await Podcast.find();
    if(!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.status(200).json(podcast);
}


/// get podcast by id

export const getPodcastById = async (req, res) => {
    const podcast = await Podcast.findById(req.params.id);
    if(!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.status(200).json(podcast);
}
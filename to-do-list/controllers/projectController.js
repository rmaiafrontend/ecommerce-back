const Project = require("../models/Project")
const Task = require("../models/Task")

const createProject = async (req, res) =>{
    const {name, description, startDate, endDate, tasksIds} = req.body

    const newProject = new Project({
        name,
        description,
        startDate,
        endDate,
        tasks: tasksIds
    });

    await newProject.save()

    await Task.updateMany(
        {_id: {$in: tasksIds}},
        {$push: {projects:newProject._id}}
    )

    res.status(201).json({
        message: "Projeto criado com sucesso"
    })

};

const getAllProjetos = async(req, res) =>{
    const profiles = await Project.find().populate("tasks", "titulo");
    res.status(200).json(profiles)
}
module.exports = {createProject, getAllProjetos}
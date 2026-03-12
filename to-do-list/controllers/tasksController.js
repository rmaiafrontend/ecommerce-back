const taskModel = require("../models/Task")
const Project = require("../models/Project")

const getTasks = async(req, res) => {
    try{
        const tasks = await taskModel.find().populate("person").populate("projects");
        res.json(tasks)
    }catch(error){
        res.status(500).json({message: "Erro ao buscar tarefas", error: error.message})
    }
}

const createTask = async(req, res) => {

    try{
        const {titulo, descricao, personId, projectIds}= req.body;
        const status = false;

        if(!titulo || !descricao){
            return res.status(400).json({message: "O campo título ou descrição está vazio"})
        }

        const task = new taskModel({
        titulo, descricao, status, person: personId
    })

    await task.save();

    
    await Project.updateMany(
        {_id: {$in: projectIds}},
        {$push: {tasks:task._id}}
    )
    
    res.status(201).json({message: "Atividade adicionada"})
    }catch(error){
        res.status(500).json({message:"Erro ao cadastrar atividade"})
    }
   
}

const deleteTask = async (req,res) => {
    const {id} = req.params;
    await taskModel.findOneAndDelete({_id: id})
    res.json({message:"Tarefa deletada"})
}

const updateTask = async (req, res) =>{
    const {id} = req.params;
    const {titulo, descricao, status} = req.body;
    await taskModel.findByIdAndUpdate(id, {titulo, descricao, status})

    res.json({message: "Tarefa atualizada"})
}

module.exports = {getTasks, createTask, deleteTask, updateTask}
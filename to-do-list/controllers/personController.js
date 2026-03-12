const Person = require("../models/Person")

const createPerson = async (req, res) =>{
    const {name, age} = req.body

    const newPerson = new Person({
        name,
        age
    });

    await newPerson.save()

    res.status(201).json({
        message: "Pessoa criada com sucesso"
    })

};

const getAllPeople = async(req, res) =>{
    const people = await Person.find().populate("profile")
    res.status(200).json(people)
}
module.exports = {createPerson, getAllPeople}

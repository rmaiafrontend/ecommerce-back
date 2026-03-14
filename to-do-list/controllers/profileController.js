const Profile = require("../models/Profile")
const Person = require("../models/Person")

const createProfile = async (req, res) =>{
    const {occupation, phone, personId} = req.body

    const newProfile = new Profile({
        occupation,
        phone,
        person: personId
    });

    await newProfile.save()

    await Person.findByIdAndUpdate(
        personId,
        {profile: newProfile._id}
    )

    res.status(201).json({
        message: "Perfil criado com sucesso"
    })

};

const getAllProfiles = async(req, res) =>{
    const profiles = await Profile.find().populate("person")
    res.status(200).json(profiles)
}
module.exports = {createProfile, getAllProfiles}
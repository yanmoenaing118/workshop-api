const Drama = require("../models/drama");


exports.getAllDramas = async (req, res, next) => {
    const dramas = await Drama.find({});
    res.status(200).json({
        error: false,
        message: "Dramas list retrieved",
        data: {
            total: dramas.length,
            dramas
        }
    })
}

exports.createDrama = async (req, res, next) => {
    const newDrama = await Drama.create(req.body);
    res.status(200).json({
        error: false,
        message: "A drama created",
        data: newDrama
    })
}

exports.getDrama = async (req, res, next) => {
    const drama = await Drama.findById(req.params.id)
    res.status(200).json({
        message: "A drama retrieved",
        error: false,
        data: drama
    })
}

exports.updateDrama = async (req, res, next) => {
    const drama = await Drama.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        message: "Updated a drama",
        error: false,
        data: drama
    })
}

exports.deleteDrama = async (req, res, next) => {
    await Drama.findByIdAndDelete(req.params.id);
    res.status(200).json({
        error: false,
        message: "Deleted a drama"
    })
}
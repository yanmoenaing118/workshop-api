const express = require("express");

const router = new express.Router();
const songController = require("./../controllers/song");


router
    .route("/")
    .get(songController.getAllSongs)
    .post(songController.createSong)

router
    .route("/:id")
    .get(songController.getSong)
    .patch(songController.updateSong)
    .delete(songController.deleteSong);


module.exports = router;
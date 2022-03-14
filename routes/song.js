const express = require("express");

const router = new express.Router();
const songController = require("./../controllers/song");
const authController = require("./../controllers/auth");

router
    .route("/")
    .get(songController.getAllSongs)
    .post(authController.protect, songController.createSong)

router
    .route("/:id")
    .get(songController.getSong)
    .patch(authController.protect, songController.updateSong)
    .delete(authController.protect, songController.deleteSong);


module.exports = router;
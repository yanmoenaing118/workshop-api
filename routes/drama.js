const express = require("express");

const router = new express.Router();
const dramaController = require("./../controllers/drama");
const authController = require("./../controllers/auth");

router
    .route("/")
    .get(dramaController.getAllDramas)
    .post(authController.protect, dramaController.createDrama)

router
    .route("/:id")
    .get(dramaController.getDrama)
    .patch(authController.protect, dramaController.updateDrama)
    .delete(authController.protect, dramaController.deleteDrama);


module.exports = router;
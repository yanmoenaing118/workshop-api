const express = require("express");

const router = new express.Router();
const dramaController = require("./../controllers/drama");

router
    .route("/")
    .get(dramaController.getAllDramas)
    .post(dramaController.createDrama)

router
    .route("/:id")
    .get(dramaController.getDrama)
    .patch(dramaController.updateDrama)
    .delete(dramaController.deleteDrama);


module.exports = router;
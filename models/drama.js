const mongoose = require("mongoose");


const dramaSchema = mongoose.Schema(
    {
        title: {
            type: String,

        },

        actor: {
            type: String,
        },

        actress: {
            type: String,
        },
    }
);


const Drama = mongoose.model("Drama", dramaSchema);

module.exports = Drama;
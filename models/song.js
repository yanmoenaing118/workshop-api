const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  title: {
    type: String,
  },

  singer: {
    type: String,
  },

  poster: {
    type: String,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;

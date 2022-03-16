const Song = require("../models/song");

exports.getAllSongs = async (req, res, next) => {
  const songs = await Song.find({});
  res.status(200).json({
    error: false,
    message: "Songs list retrieved",
    data: {
      total: songs.length,
      songs,
    },
  });
};

exports.createSong = async (req, res, next) => {
  const newSong = await Song.create(req.body);
  res.status(200).json({
    error: false,
    message: "A song created",
    data: newSong,
  });
};

exports.getSong = async (req, res, next) => {
  const song = await Song.findById(req.params.id);
  res.status(200).json({
    message: "A song retrieved",
    error: false,
    data: song,
  });
};

exports.updateSong = async (req, res, next) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "Updated a song",
    error: false,
    data: song,
  });
};

exports.deleteSong = async (req, res, next) => {
  await Song.findByIdAndDelete(req.params.id);
  res.status(200).json({
    error: false,
    message: "Deleted a song",
  });
};

import Genre from "../Models/Genre.Modal.js";

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    return res.status(200).json({ message: "Genres fetched successfully", success: true, genres });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const addGenre = async (req, res) => {
  try {
    const { genre } = req.body;
    if (!genre) {
      return res.status(400).json({ message: "Genre is required", success: false });
    }

    if (genre.length < 3 || genre.length > 20) {
      return res
        .status(400)
        .json({ message: "Genre must be between 3 and 20 characters", success: false });
    }

    let genreLowerCase = genre.toLowerCase();

    const existingGenre = await Genre.findOne({ genre: genreLowerCase });
    if (existingGenre) {
      return res.status(400).json({ message: "Genre already exists", success: false });
    }

    const newGenre = new Genre({ genre: genreLowerCase });

    if (!newGenre) {
      return res.status(400).json({ message: "Genre creation failed", success: false });
    }

    await newGenre.save();
    return res
      .status(200)
      .json({ message: "Genre added successfully", success: true, genre: newGenre });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

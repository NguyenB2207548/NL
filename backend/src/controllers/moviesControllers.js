import db from "../config/db.js";

export const getAllMovie = async (req, res) => {
  try {
    const [movies] = await db.execute("SELECT * FROM movies");
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

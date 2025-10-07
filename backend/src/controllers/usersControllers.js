import db from "../config/db.js";

export const getAllUser = async (req, res) => {
  try {
    const [users] = await db.execute(`SELECT * FROM users`);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

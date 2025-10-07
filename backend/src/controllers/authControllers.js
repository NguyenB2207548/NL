import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SIGN-UP
export const signUP = async (req, res) => {
  const { username, password, email, fullname } = req.body;
  try {
    if (!username || !password || !email || !fullname) {
      return res.status(400).json({
        message: "Vui lòng nhập đủ username, email, password và fullname",
      });
    }

    const [existing] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Username hoặc Email đã tồn tại" });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await db.execute(
      "INSERT INTO users (username, passwordHash, email, fullname) VALUES (?, ?, ?, ?)",
      [username, passwordHash, email, fullname || null]
    );

    res.status(201).json({ message: "Sign-up successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

// SIGN-IN
export const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Sai username" });
    }
    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Sign-in successfully",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

import bcrypt from "bcryptjs";
import { con } from "../database/db.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.json({ message: "All fields are requireds." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const checkQuery = "SELECT * FROM users WHERE email=?";
  con.query(checkQuery, [email], (err, res) => {
    if (res) {
      return res.json({ message: "User already exists." });
    }
  });

  const SQL = "INSERT INTO users (Name, Email, Password) VALUES(?, ?, ?)";
  const values = [name, email, hashPass];

  con.query(SQL, [values], (err, res) => {
    return res.json({ message: "User successfully added.", Success: true, res });
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are requireds." });
    }

    const querySql = "SELECT * FROM users WHERE email=?";
    con.query(querySql, email, (err, res) => {
      if (!res) {
        return res.json({ message: "User Not Found" });
      } else {
        const passwordMatch = bcrypt.compare(password, res[0].password);
        if (!passwordMatch) {
          return res.json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          { id: res[0].id, email: res[0].email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        return res.json({ message: "User authenticated", token });
      }
    });
  } catch (error) {
    return res.json({ error: error });
  }
};

export const getUser = async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.json({ message: 'No token provided' });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const SelectQuery = "SELECT id, Email, Name FROM users WHERE id=?";
        con.query(SelectQuery, decode.id, (err, result) => {
            if(!result){
                return res.json({ message: 'User not found' });
            }

            return res.json({ message: "User Profile was successfully", data: result});
        })

    } catch (error) {
        res.json({ message: 'Failed to authenticate token', error: error });
    }
}

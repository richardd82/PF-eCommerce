const { Router } = require("express");
const bcrypt = require("bcrypt");
// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { response } = require("express");
// const { googleVerify } = require("../helpers/google-verify.js");

const router = Router();
//Logeo
router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;

  const user = await User.findOne({
     where:
     { username: username, }
    
  });

  const passwordCorrect =
    user === null || user.length === 0
      ? false
      : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Invalid user or password" });
  }

  const userForToken = {
    id: user.id,
    username: user.username,
    admin: user.isAdmin,
    email: user.email,
    name: user.name,
    image: user.image,
  };

  const token = jwt.sign(userForToken, process.env.JWT_secret_key);

  user.deleted
    ? res.status(200).json({ error: "User is blocked" })
    : res.status(200).json({ auth: "User login success", userForToken, token });
} catch (error) {
     console.log(error)
    }
});

 // Registro
 router.post("/register", async (req, res) => {
    try {
      const { username, password, email, name, lastName } = req.body;
      if (!username) return res.status(400).send("Faltan datos necesarios (username).");
      if (!lastName) return res.status(400).send("Faltan datos necesarios (lastName).");
      if (!password)
        return res.status(400).send("Faltan datos necesarios (password).");
      if (!email) return res.status(400).send("Faltan datos necesarios (email).");
      if (!name) return res.status(400).send("Faltan datos necesarios (name).");
      if (!isNaN(parseInt(name)))
        return res
          .status(400)
          .send(
            "Formato de datos invalido (name) debe ser una cadena texto."
          );
      if (!isNaN(parseInt(email)))
        return res
          .status(400)
          .send(
            "Formato de datos invalido (email) debe ser una cadena texto."
          );
  
      await bcrypt.hash(password, 10, async function (err, hash) {
        try {
          const userNew = await User.create({
            username,
            password: hash,
            email,
            name: name.toLowerCase(),
            lastName: lastName.toLowerCase()
          });
          return res.status(201).json(userNew);
        } catch (error) {
          return res.status(400).send("Error: " + error);
        }
      });
    } catch (e) {
      return res.status(400).send("Error: " + e);
    }
  });
  
module.exports = router;
  
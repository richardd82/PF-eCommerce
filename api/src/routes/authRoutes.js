
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
        var  isAdmin=false
          if (
            email === "rider_shock@outlook.es" ||
            email === "richardd82@gmail.com" ||
            email === "matimogica@gmail.com" ||
            email === "rideralucar@gmail.com" ||
            email === "leandro.valentine92@gmail.com"
          ) {
           isAdmin = true;
         }    
  
      await bcrypt.hash(password, 10, async function (err, hash) {
        try {
          const userNew = await User.create({
            username,
            password: hash,
            email,
            name: name.toLowerCase(),
            lastName: lastName.toLowerCase(),
            isAdmin:isAdmin
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

  router.post("/google", async (req, res, next) => {
    const { email, password, name, lastName, image, address } = req.body;

    console.log("entro validacion Google", email, password, name, lastName, image, address);
    let isAdmin = false;
    let isBaned = false;
    try {
       var userValidate = await User.findAll({
          where: { email: email },
       });
 
       console.log("user validate", userValidate);
        if (
          email === "rider_shock@outlook.es" ||
          email === "richardd82@gmail.com" ||
          email === "matimogica@gmail.com" ||
          email === "rideralucar@gmail.com" ||
          email === "leandro.valentine92@gmail.com"
        ) {
         isAdmin = true;
       }
 
       let passwordHash = await bcrypt.hash(password, 10);
 
       if (Object.entries(userValidate).length === 0) {
          const user = await User.findOrCreate({
             where: {
                username: email,
                email: email,
                name: name,
                lastName: lastName,
                password: passwordHash,
                image: image,
                address: address,
                isAdmin: isAdmin,
                isBaned: isBaned,
             },
          });
          // await transporter.sendMail({ , // html body
          // }); VA ENVIO DE EMAIL!!!!!!!!!!!
          userValidate = User.findAll({
             where: { email: email },
          });
       }

       const userForToken = {
        username: "username",
        name: userValidate[0].dataValues.name,
        lastName: userValidate[0].dataValues.lastName,
        image: userValidate[0].dataValues.image,
        address: userValidate[0].dataValues.address,
        isAdmin: userValidate[0].dataValues.isAdmin,
        id: userValidate[0].dataValues.id,
       }

       const token = jwt.sign(userForToken, process.env.JWT_secret_key);

       res.status(200).json({ userForToken, token })
    } catch (err) {
       console.log("entro error");
       next(err);
    }
 });
  
  router.post("/verify",verifyToken,(req,res)=>{
 
    jwt.verify(req.token,process.env.JWT_secret_key,(error,authData)=>{
    if(error){
      res.sendStatus(403);
    }
    else{
      res.json({
      mensaje:"Post fue creado",
      authData})
    }
  });

});


function verifyToken(req,res,next){
  console.log(req.body)
  const beareHeader=req.body['authorization'];
  if(typeof beareHeader!=='undefined'){
  req.token=beareHeader.split(" ")[1];
  next();
  }
  else
    res.sendStatus(403);
}


module.exports = router;
  
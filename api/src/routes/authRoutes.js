
const { Router } = require("express");
const bcrypt = require("bcrypt");
// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { response } = require("express");
const { URL_FRONT } = process.env;
const { sendRegisterEmail } = require("../Email/mail.config");
const { getTokenData } = require("../tokenVerify/tokenVerify")
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
console.log("usuario de logueo", user)
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
    address: user.address,
    phone: user.phone
  };

  console.log(userForToken, "user for token")

  const token = jwt.sign(userForToken, process.env.JWT_secret_key);

  (user.verify === false)
    ? res.redirect("/register").json({ error: "Usuario no verificado" })
    : res.status(200).json({ auth: "User login success", userForToken, token });
} catch (error) {
     console.log(error)
    }
});

 // Registro
 router.post("/register", async (req, res) => {

     try {
       const { username, password, email, name, lastName, image, address, phone } = req.body;

      let user = await User.findOne({
        where: {
          email: email
        }
      }) 

      if(user !== null){
        return res.json({
          succes: false,
          msj: 'Usuario ya existe'
        })
      }
      console.log(user, "USERRR")

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
            user = await User.create({
            username,
            password: hash,
            email,
            name: name.toLowerCase(),
            lastName: lastName.toLowerCase(),

            image,
            address,
            phone      
            isAdmin:isAdmin

          });
          const token = jwt.sign( JSON.stringify(user), process.env.JWT_secret_key);
          console.log(token, "TOKEN")
          console.log(user,"NEW USER")
          await sendRegisterEmail(email, name, token)
          return res.status(201).json(user);
        } catch (error) {
          return res.status(400).send("EL Error: " + error);
        }
      });
    } catch (e) {
      return res.status(400).send("Error: " + e);
    }

   });

  router.get("/confirm/:token", async (req, res, next) => {
    
    try {
      const { token } = req.params

      const data = await getTokenData(token);

      if(data === null) {
           return res.json({
               success: false,
               msg: 'Error al obtener data'
           });
      }

      console.log("DATA",data);

      const { email, id } = data

      console.log(data.email)

      let user = await User.findOne({
        where: {
          email: email
        }
      }) 
      console.log(user)
      if(id !== user.id){
        console.log("El id no coincide con el usuario")
      }

      user.verify = true
      await user.save()
      console.log("USER", user)
      res.redirect(`${URL_FRONT}`)
    } catch (error) {
      console.log("Error para verificar token")
    }
  })

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
  
const jwt = require("jsonwebtoken");
const CourierClient = require("@trycourier/courier").CourierClient;
const courier = CourierClient({
  authorizationToken: process.env.COURRIER_API_KEY,
});
const { URL_BACK } = process.env;
// const plantilla = require("../../../client/src/components/PlantillaEmail/plantillaEmail")

  const sendRegisterEmail = async (email, name, token) => {
console.log("ENTRA ENVIO")
    await courier.send({
        message: {
            to: {
                data: {
                    name: "Contact-Form",
                  },    
              email: email,
            },
            content: {
              title: "WELCOME TO ALIEN STREET",
              body: ` Hi ${name}, thank you for registering on our page, to activate your account click on the following link: ${URL_BACK}/auth/confirm/${token}`,
            },
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
      });

  }


  module.exports = {
    sendRegisterEmail,
  }
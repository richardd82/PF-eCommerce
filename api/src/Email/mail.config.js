const jwt = require("jsonwebtoken");
const CourierClient = require("@trycourier/courier").CourierClient;
const courier = CourierClient({
  authorizationToken: process.env.COURRIER_API_KEY,
});
const { URL_BACK,URL_FRONT } = process.env;

  const sendRegisterEmail = async (email, name, token) => {

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

  const forgotEmail = async (email, token) => {
console.log("entra envio")
console.log(token)
    await courier.send({
      message: {
        to: {
          data: {
            name: "Forgot Email",
          },
          email: email,
        },
        content: { 
          title: "Recover your password", 
          body: `To recover your password, click on the following link: ${URL_FRONT}/reset/${token}`},
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
    });
  
  }


  module.exports = {
    sendRegisterEmail,
    forgotEmail
  }